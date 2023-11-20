import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { GET_IMAGE } from '@/constant';
import {
  createRoomChat,
  findChatMessages,
  getChatFriendRecent,
  getChatWithTeacher,
  getRecommendFriendForStudent,
  getRecommendFriendForTeacher,
  getRoomChat,
} from '@/services/api/ChatController';
import { upload } from '@/services/api/FileStorageController';
import { CloseOutlined, DownOutlined, FileImageOutlined } from '@ant-design/icons';
import { history, useAccess, useModel, useParams } from '@umijs/max';
import {
  Avatar,
  Badge,
  Button,
  Col,
  Collapse,
  Divider,
  Empty,
  Image,
  Input,
  message,
  Row,
  Spin,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import moment from 'moment';
import 'moment/locale/vi';
import { useContext, useEffect, useRef, useState } from 'react';
import { WebSocketContext } from '../WebSocketProvider';
import './index.less';

interface ImageType {
  uuid: string;
  url: string;
}

interface ReadChat {
  userId: string;
  recipientId: string;
}

const { Panel } = Collapse;

const PAGE_SIZE = 10;
export default (): JSX.Element => {
  const stompClient = useContext(WebSocketContext);
  const { recipientId } = useParams();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const access = useAccess();

  const { initialState } = useModel('@@initialState');
  const recipient = useRef(JSON.parse(sessionStorage.getItem(recipientId)));
  const [recommendFriend, setRecommendFriend] = useState<API.UserInfoChat[]>([]);
  const [friendChatRecent, setFriendChatRecent] = useState<API.UserInfoChat[]>([]);
  const [teacherChat, setTeacherChat] = useState<API.UserInfoChat[]>([]);
  const [messages, setMessages] = useState<API.ChatMessage[]>([]);
  const [currentRoom, setCurrentRoom] = useState<API.ChatRoomDto>({});
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imagesUrl, setImagesUrl] = useState<ImageType[]>([]);
  const [pageSizeRecommend, setPageSizeRecommend] = useState(PAGE_SIZE);
  const [pageSizeRecent, setPageSizeRecent] = useState(PAGE_SIZE);
  const [pageSizeTeacher, setPageSizeTeacher] = useState(PAGE_SIZE);
  const [totalRecommend, setTotalRecommend] = useState(0);
  const [totalRecent, setTotalRecent] = useState(0);
  const [totalTeacher, setTotalTeacher] = useState(0);
  const [listNotify, setListNotify] = useState<API.NotifyChatModel[]>([]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const handleBeforeUpload = (file: File) => {
    upload({ file: '' }, file).then((res) => {
      if (res.code === 0) {
        const image: ImageType = {
          uuid: file.uid,
          url: res.data?.url || '',
        };
        imagesUrl.push(image);
        setImagesUrl(imagesUrl);
      }
    });
  };

  const updateListChat = (listChat: API.NotifyChatModel[], newChat: API.NotifyChatModel) => {
    if (listChat.length === 0) {
      listChat.push(newChat);
      return listChat;
    }
    const index = listChat.findIndex((d) => d.senderId === newChat.senderId);
    if (index === -1) {
      listChat.push(newChat);
      return listChat;
    }
    listChat[index] = newChat;
    return listChat;
  };

  const handleGetMessages = (recipientId: string) => {
    setIsLoading(true);
    findChatMessages({
      recipientId: recipientId || '',
      senderId: initialState?.currentUser?.id || '',
      page: 0,
      size: 999,
      sort: 'epochTime,asc',
    })
      .then((res) => {
        if (res.code === 0) {
          setMessages(res.data?.data || []);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getChatFriendRecent({ page: 0, size: pageSizeRecent }).then((res) => {
      if (res.code === 0) {
        setFriendChatRecent(res.data?.data || []);
        setTotalRecent(res.data?.total || 0);
        res.data?.data?.forEach((d) =>
          updateListChat(listNotify, { senderId: d.id, totalNewMessage: d.totalNewMessage }),
        );
        setListNotify(listNotify);
      }
    });
  }, [pageSizeRecent]);
  useEffect(() => {
    if (access.canStudent) {
      getChatWithTeacher({ page: 0, size: pageSizeTeacher }).then((res) => {
        if (res.code === 0) {
          setTeacherChat(res.data?.data || []);
          setTotalTeacher(res.data?.total || 0);
          res.data?.data?.forEach((d) =>
            updateListChat(listNotify, { senderId: d.id, totalNewMessage: d.totalNewMessage }),
          );
          setListNotify(listNotify);
        }
      });
    }
  }, [pageSizeTeacher]);
  useEffect(() => {
    if (access.canStudent) {
      getRecommendFriendForStudent({ page: 0, size: pageSizeRecommend }).then((res) => {
        if (res.code === 0) {
          setRecommendFriend(res.data?.data || []);
          setTotalRecommend(res.data?.total || 0);
        }
      });
    } else {
      getRecommendFriendForTeacher({ page: 0, size: pageSizeRecommend }).then((res) => {
        if (res.code === 0) {
          setRecommendFriend(res.data?.data || []);
          setTotalRecommend(res.data?.total || 0);
        }
      });
    }
  }, [pageSizeRecommend, currentRoom]);

  useEffect(() => {
    if (recipientId !== '' && recipientId !== undefined) {
      handleGetMessages(recipientId);
    }
  }, [recipientId]);

  // scroll xuỗng cuối cùng
  useEffect(() => {
    if (chatContainerRef !== null || chatContainerRef !== undefined) {
      chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
    }
  }, [chatContainerRef.current, messages.length]);

  // subscribe topic websocket
  useEffect(() => {
    stompClient?.subscribe(
      '/user/' + initialState?.currentUser?.id + '/queue/messages',
      (message) => {
        const newMessage = JSON.parse(message.body);

        // if (recipientId === newMessage.id) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        // }
      },
    );

    stompClient?.subscribe(
      `/user/${initialState?.currentUser?.id}/notify/total-messages`,
      (message) => {
        const newMessage = JSON.parse(message.body);
        if (recipientId !== newMessage.senderId) {
          updateListChat(listNotify, newMessage);
          setListNotify(listNotify);
        }
      },
    );
  }, [stompClient]);

  // đọc tin nhắn mới
  const readChat = (recipientId: string) => {
    const data: ReadChat = {
      userId: initialState?.currentUser?.id || '',
      recipientId: recipientId,
    };
    stompClient?.send('/app/chat/read', {}, JSON.stringify(data));
  };

  // handle gửi tin nhắn
  const sendMessage = (msg: string) => {
    if (imagesUrl.length > 0) {
      const message: API.ChatMessage = {
        chatId: currentRoom.chatId || '',
        imagesUrl: imagesUrl.map((i) => i.url),
        senderId: initialState?.currentUser?.id || '',
        recipientId: recipientId || '',
        senderName: `${initialState?.currentUser?.firstName} ${initialState?.currentUser?.lastName}`,
        recipientName: `${recipient.current?.firstName} ${recipient.current?.lastName}`,
        content: msg,
        timestamp: moment(new Date()).format('MM/DD/YYYY hh:mm:ss'),
      };
      stompClient?.send('/app/chat', {}, JSON.stringify(message));

      const newMessages = [...messages];
      newMessages.push(message);
      setMessages(newMessages);
    } else {
      if (msg.trim() !== '') {
        const message: API.ChatMessage = {
          chatId: currentRoom.chatId || '',
          imagesUrl: [],
          senderId: initialState?.currentUser?.id || '',
          recipientId: recipientId || '',
          senderName: `${initialState?.currentUser?.firstName} ${initialState?.currentUser?.lastName}`,
          recipientName: `${recipient.current?.firstName} ${recipient.current?.lastName}`,
          content: msg,
          timestamp: moment(new Date()).format('MM/DD/YYYY hh:mm:ss'),
        };
        stompClient?.send('/app/chat', {}, JSON.stringify(message));

        const newMessages = [...messages];
        newMessages.push(message);
        setMessages(newMessages);
      }
    }
  };

  // lấy tổng số tin nhắn mới
  const getNumberNewChat = (senderId?: string) => {
    const data: API.NotifyChatModel | undefined = listNotify
      .filter((d) => d.senderId === senderId)
      ?.at(0);
    if (data) {
      return data.totalNewMessage;
    }
    return 0;
  };

  return (
    <>
      <BreadcrumbCustom
        subNav={[
          {
            name: 'Trang chủ',
            path: '/',
          },
          {
            path: '',
            name: 'Trò chuyện',
          },
        ]}
      />
      <Row gutter={24} style={{ height: '80vh' }}>
        <Col span={4} style={{ padding: '0px ' }} className="list-friend">
          <div className="chats">
            <Collapse defaultActiveKey={['1', '2', '3']}>
              <Panel header="Trò chuyện gần đây" key="1">
                {friendChatRecent.map((data) => {
                  return (
                    <div
                      key={data?.id}
                      className={`person ${recipientId === data?.id ? 'single-person-active' : ''}`}
                    >
                      <div
                        id={data?.id}
                        key={data?.id}
                        className={`single-person`}
                        onClick={() => {
                          if (recipientId !== undefined) {
                            sessionStorage.setItem(recipientId, JSON.stringify(data));
                          }
                          history.push(`/chat/${data?.id}`);
                          getRoomChat({ recipientId: data?.id }).then((res) => {
                            if (res.code === 0) {
                              setCurrentRoom(res.data?.chatRoom || {});
                              readChat(data.id);
                            } else {
                              createRoomChat({ recipientId: data?.id || '' }).then((res) => {
                                if (res.code === 0) {
                                  setCurrentRoom(res.data?.chatRoom || {});
                                } else {
                                  message.error(res.message, 3);
                                }
                              });
                            }
                          });
                        }}
                      >
                        <Badge dot color={data?.isOnline ? 'green' : 'yellow'} size="default">
                          <Avatar size={48} src={data?.avatar || '/icons/Liveness.png'} />
                          {getNumberNewChat(data.id) > 0 ? (
                            <div className="new-message">
                              <div className="total">{getNumberNewChat(data.id)}</div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </Badge>
                        <div className="person-name">{`${data?.firstName} ${data?.lastName}`}</div>
                      </div>
                    </div>
                  );
                })}
                <div
                  className={`view-more-chat ${
                    pageSizeRecent >= totalRecent ? 'view-more-chat-disable' : ''
                  }`}
                  onClick={() => {
                    if (pageSizeRecent < totalRecent) {
                      setPageSizeRecent(pageSizeRecent + PAGE_SIZE);
                    }
                  }}
                >
                  <div style={{ fontSize: '10px', lineHeight: '10px' }}>
                    <DownOutlined />
                  </div>
                  <div>Xem thêm</div>
                </div>
              </Panel>
              {access.canStudent ? (
                <Panel header="Giáo viên" key="2">
                  {teacherChat.map((data) => {
                    return (
                      <div
                        key={data?.id}
                        className={`person ${
                          recipientId === data?.id ? 'single-person-active' : ''
                        }`}
                      >
                        <div
                          id={data?.id}
                          key={data?.id}
                          className={`single-person`}
                          onClick={() => {
                            if (recipientId !== undefined) {
                              sessionStorage.setItem(recipientId, JSON.stringify(data));
                            }
                            history.push(`/chat/${data?.id}`);
                            getRoomChat({ recipientId: data?.id }).then((res) => {
                              if (res.code === 0) {
                                setCurrentRoom(res.data?.chatRoom || {});
                                readChat(data.id);
                              } else {
                                createRoomChat({ recipientId: data?.id || '' }).then((res) => {
                                  if (res.code === 0) {
                                    setCurrentRoom(res.data?.chatRoom || {});
                                  } else {
                                    message.error(res.message, 3);
                                  }
                                });
                              }
                            });
                          }}
                        >
                          <Badge dot color={data?.isOnline ? 'green' : 'yellow'} size="default">
                            <Avatar size={48} src={data?.avatar || '/icons/Liveness.png'} />
                            {getNumberNewChat(data.id) > 0 ? (
                              <div className="new-message">
                                <div className="total">{getNumberNewChat(data.id)}</div>
                              </div>
                            ) : (
                              <></>
                            )}
                          </Badge>
                          <div className="person-name">{`${data?.firstName} ${data?.lastName}`}</div>
                        </div>
                      </div>
                    );
                  })}
                  <div
                    className={`view-more-chat ${
                      pageSizeTeacher >= totalTeacher ? 'view-more-chat-disable' : ''
                    }`}
                    onClick={() => {
                      if (pageSizeTeacher < totalTeacher) {
                        setPageSizeTeacher(pageSizeTeacher + PAGE_SIZE);
                      }
                    }}
                  >
                    <div style={{ fontSize: '10px', lineHeight: '10px' }}>
                      <DownOutlined />
                    </div>
                    <div>Xem thêm</div>
                  </div>
                </Panel>
              ) : (
                <></>
              )}
              <Panel header="Những người bạn có thể biết" key="3">
                {recommendFriend.map((data) => {
                  return (
                    <div
                      key={data?.id}
                      className={`person ${recipientId === data?.id ? 'single-person-active' : ''}`}
                    >
                      <div
                        id={data?.id}
                        key={data?.id}
                        className={`single-person`}
                        onClick={() => {
                          if (recipientId !== undefined) {
                            sessionStorage.setItem(recipientId, JSON.stringify(data));
                          }
                          history.push(`/chat/${data?.id}`);
                          getRoomChat({ recipientId: data?.id }).then((res) => {
                            if (res.code === 0) {
                              setCurrentRoom(res.data?.chatRoom || {});
                            } else {
                              createRoomChat({ recipientId: data?.id || '' }).then((res) => {
                                if (res.code === 0) {
                                  setCurrentRoom(res.data?.chatRoom || {});
                                } else {
                                  message.error(res.message, 3);
                                }
                              });
                            }
                          });
                        }}
                      >
                        <Badge dot color={data?.isOnline ? 'green' : 'yellow'} size="default">
                          <Avatar
                            size={48}
                            src={
                              data?.avatar ||
                              '/icons/Liveness.png                                                                                                                   '
                            }
                          />
                        </Badge>
                        <div className="person-name">{`${data?.firstName} ${data?.lastName}`}</div>
                      </div>
                    </div>
                  );
                })}
                <div
                  className={`view-more-chat ${
                    pageSizeRecommend >= totalRecommend ? 'view-more-chat-disable' : ''
                  }`}
                  onClick={() => {
                    if (pageSizeRecommend < totalRecommend) {
                      setPageSizeRecommend(pageSizeRecommend + PAGE_SIZE);
                    }
                  }}
                >
                  <div style={{ fontSize: '10px', lineHeight: '10px' }}>
                    <DownOutlined />
                  </div>
                  <div>Xem thêm</div>
                </div>
              </Panel>
            </Collapse>
          </div>
        </Col>
        <Col span={20}>
          <div className="chat-container">
            {messages.length > 0 ? (
              <>
                <div className="chat-content" ref={chatContainerRef}>
                  <Spin spinning={isLoading}>
                    {messages.map((message) => {
                      if (message.senderId === initialState?.currentUser?.id) {
                        return (
                          <div key={message.id}>
                            <div style={{ textAlign: 'center' }}>
                              {moment(message.timestamp).locale('vi').format('dd HH:mm')}
                            </div>

                            <div className="message-send">
                              <div style={{ flex: 0.4 }}></div>
                              <div style={{ flex: 0.2 }}></div>
                              <div
                                style={{
                                  flex: 0.4,
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                }}
                                className="single-message"
                              >
                                {message.imagesUrl && message.imagesUrl?.length > 0 ? (
                                  <div className="chat-bubble">
                                    {message.imagesUrl?.map((url, index) => (
                                      <Image
                                        key={index}
                                        className="chat-image"
                                        src={GET_IMAGE.getUrl(url)}
                                      />
                                    ))}
                                  </div>
                                ) : (
                                  <></>
                                )}
                                {message && message.content !== '' && message !== null ? (
                                  <div key={message.id} className="message-content">
                                    {message.content}
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      } else if (message.senderId === recipientId) {
                        return (
                          <div key={message.id}>
                            <Spin spinning={isLoading}>
                              <div style={{ textAlign: 'center' }}>
                                {moment(message.timestamp).locale('vi').format('dd HH:mm')}
                              </div>
                              <div className="message-receive">
                                <div
                                  className="single-message"
                                  style={{ flex: 0.4, alignItems: 'start' }}
                                >
                                  {message.imagesUrl && message.imagesUrl?.length > 0 ? (
                                    <div className="chat-bubble">
                                      {message.imagesUrl?.map((url, index) => (
                                        <Image
                                          key={index}
                                          className="chat-image"
                                          src={GET_IMAGE.getUrl(url)}
                                        />
                                      ))}
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  {message && message.content !== '' && message !== null ? (
                                    <div
                                      key={message.id}
                                      className="message-content"
                                      style={{ background: '#3E4042' }}
                                    >
                                      {message.content}
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div style={{ flex: 0.2 }}></div>
                                <div style={{ flex: 0.4 }}></div>
                              </div>
                            </Spin>
                          </div>
                        );
                      } else {
                        return;
                      }
                    })}
                  </Spin>
                </div>
              </>
            ) : (
              <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                <Empty
                  description="Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới "
                  style={{ flex: '1' }}
                />
              </div>
            )}
            {recipientId === null || recipientId === undefined ? (
              <></>
            ) : (
              <div className="chat-form">
                <Divider />
                <div style={{ display: 'flex' }}>
                  <div style={{ margin: '0 12px', alignSelf: 'end' }}>
                    <Upload
                      accept="image/*"
                      showUploadList={false}
                      beforeUpload={handleBeforeUpload}
                      onChange={handleChange}
                      fileList={fileList}
                    >
                      <Button icon={<FileImageOutlined />} />
                    </Upload>
                  </div>
                  <div
                    style={{
                      flex: '1',
                    }}
                  >
                    <div style={{ display: 'flex' }}>
                      {fileList &&
                        fileList.map((imageFile) => {
                          return (
                            <div className="image-container">
                              <div
                                className="remove-image"
                                onClick={() => {
                                  let newFiles = fileList.filter((t) => t !== imageFile);
                                  let newImageUrl = imagesUrl.filter(
                                    (i) => i.uuid !== imageFile.uid,
                                  );
                                  setFileList(newFiles);
                                  setImagesUrl(newImageUrl);
                                }}
                              >
                                <div>
                                  <CloseOutlined style={{ fontSize: '14px' }} />
                                </div>
                              </div>
                              <img
                                src={URL.createObjectURL(imageFile.originFileObj as File)}
                                alt="Uploaded"
                              />
                            </div>
                          );
                        })}
                    </div>
                    <Input.TextArea
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' && !event.shiftKey) {
                          event.preventDefault();
                          sendMessage(text);
                          setText('');
                          setFileList([]);
                          setImagesUrl([]);
                        }
                      }}
                      onChange={(e) => setText(e.target.value)}
                      autoSize={{ minRows: 1, maxRows: 6 }}
                      style={{
                        borderTopLeftRadius: '8px',
                        borderBottomLeftRadius: ' 8px',
                      }}
                      placeholder="Aa"
                      value={text}
                    />
                  </div>
                  <Button
                    type="primary"
                    style={{ alignSelf: 'end' }}
                    onClick={() => {
                      sendMessage(text);
                      setText('');
                      setFileList([]);
                      setImagesUrl([]);
                    }}
                  >
                    Gửi
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};
