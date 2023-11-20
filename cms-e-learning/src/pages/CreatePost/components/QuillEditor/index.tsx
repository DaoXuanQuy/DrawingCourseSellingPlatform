import { GET_IMAGE } from '@/constant';
import { upload } from '@/services/api/FileStorageController';
import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default (): JSX.Element => {
  const [editorContent, setEditorContent] = useState(
    'https://minio.tiktzuki.com/e-learning/public/file_1687677925841.png',
  );
  const quillRef = useRef<any>();

  var quillObj: any;
  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['link', 'image'],
    ['clean'], // remove formatting button
  ];

  const handleImageUpload = (file: File) => {
    // Tạo một promise để xử lý việc tải ảnh lên server
    return new Promise((resolve, reject) => {
      upload({ file: '' }, file).then((res) => {
        if (res.data?.url) {
          // Gọi resolve với URL của ảnh đã tải lên
          resolve(GET_IMAGE.getUrl(res.data.url));
        }
      });
    });
  };

  const handleEditorChange = (content: any) => {
    setEditorContent(content);
  };

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        value={editorContent}
        onChange={handleEditorChange}
        modules={{
          toolbar: {
            container: toolbarOptions,
            imageResize: {
              displaySize: true,
            },
            handlers: {
              image: () => {
                // Khi người dùng nhấp vào biểu tượng hình ảnh
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.click();

                // Xử lý sự kiện khi người dùng chọn một ảnh từ hộp thoại
                input.onchange = () => {
                  if (input.files !== null) {
                    const file = input.files[0];
                    // Gọi hàm xử lý tải ảnh lên server
                    handleImageUpload(file).then((imageUrl) => {
                      console.log(imageUrl);
                      // setEditorContent(imageUrl as string);
                      // const quill = quillRef.current.getEditor();
                      // const range = quill.getSelection(); // Chèn ảnh vào vị trí con trỏ của trình soạn thảo
                      // quillRef.current
                      //   .getEditor()
                      //   .clipboard.dangerouslyPasteHTML(
                      //     range.index,
                      //     `<img src="${imageUrl}" alt="Uploaded Image" />`,
                      //   );
                    });
                  }
                };
              },
            },
            table: true,
          },
        }}
      />
    </div>
  );
};
