import { createContext, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export const WebSocketContext = createContext<Stomp.Client | null>(null);

const WebSocketProvider = ({ children }: any) => {
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const [connected, setConnected] = useState(false);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  useEffect(() => {
    const connectWebSocket = () => {
      const maxConnectionAttempts = 100; // Số lần kết nối lại tối đa
      if (connectionAttempts >= maxConnectionAttempts) {
        console.error('Không thể kết nối lại sau số lần thử quá giới hạn');
        // Thực hiện các xử lý phù hợp trong trường hợp không thể kết nối lại
        return;
      }

      // Kết nối WebSocket và tạo Stomp Client
      const socket = new SockJS(`${API_URL}/ws`); // Đổi URL cho phù hợp
      const client: Stomp.Client = Stomp.over(socket);
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('user_accessToken')}`,
      };
      client.connect(
        headers,
        () => {
          setStompClient(client);
          setConnected(true);
          setConnectionAttempts(0);
        },
        (error) => {
          console.error('Kết nối WebSocket thất bại:', error);
          setConnectionAttempts(connectionAttempts + 1);
          setTimeout(connectWebSocket, 3000); // Thử kết nối lại sau 5 giây
        },
      );
    };
    connectWebSocket();
    return () => {
      if (stompClient) {
        // Hủy kết nối khi component bị hủy
        stompClient.disconnect(() => {});
      }
    };
  }, []);

  return <WebSocketContext.Provider value={stompClient}>{children}</WebSocketContext.Provider>;
};

export default WebSocketProvider;
