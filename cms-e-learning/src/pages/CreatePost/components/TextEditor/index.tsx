import { GET_IMAGE } from '@/constant';
import { upload } from '@/services/api/FileStorageController';
import { message } from 'antd';
import ImageResize from 'quill-image-resize-module-react';
import React, { useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
Quill.register('modules/imageResize', ImageResize);
const toolbar = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize'],
  },
};
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'code',
  'color',
  'background',
  'code-block',
  'align',
];

interface OnChangeHandler {
  (e: any): void;
}

type Props = {
  value?: string;
  placeholder?: string;
  onChange?: OnChangeHandler;
};

const TextEditor: React.FC<Props> = ({ value, onChange, placeholder }) => {
  const reactQuillRef: any = useRef(null);
  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', 'multiple');
    input.click();
    input.onchange = async () => {
      if (input.files) {
        Array.from(input.files).forEach((item) => {
          const formData = new FormData();
          formData.append('file', item);
          formData.append('subjectId', '123');
          const hide = message.loading('Đang tải ảnh', 0);
          upload({ file: '' }, item as File).then(({ data }) => {
            console.log('data', data);
            const quill = reactQuillRef?.current?.getEditor();
            const cursorPosition = quill.getSelection().index;
            const link = GET_IMAGE.getUrl(data?.url);
            console.log(quill.insertEmbed);
            // max-width: 100%;
            quill.insertEmbed(cursorPosition, 'image', link);
            quill.setSelection(cursorPosition + 1);
            hide();
          });
        });
      }
    };
  };

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          [{ color: [] }, { background: [] }, { align: [] }],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
    }),
    [],
  );

  return (
    <ReactQuill
      ref={reactQuillRef}
      theme="snow"
      value={value || ''}
      modules={modules}
      formats={formats}
      bounds={'#root'}
      onChange={onChange}
      placeholder={placeholder}
      style={{ height: '100%' }}
    />
  );
};

export default TextEditor;
