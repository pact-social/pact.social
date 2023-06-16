import dynamic from 'next/dynamic'
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Quill } from 'react-quill';
// @ts-ignore
import QuillMarkdown from 'quilljs-markdown';

import 'quilljs-markdown/dist/quilljs-markdown-common-style.css'
import "react-quill/dist/quill.snow.css";
import { htmlToMarkdown } from '../../lib/mdUtils';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})

const modules = {
  toolbar: [
    [{ header: [2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    ["blockquote", "code-block"],
    [{ list:  "ordered" }, { list:  "bullet" }],
    [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
    [
      "link",
      // "image",
      // "video"
    ],
  ],
  markdownOptions: {}
}

export type RteFieldType = {
  label?: string;
  field?: string;
}

export default function RteField(args: RteFieldType) {
  const { register, setValue, getValues, watch, formState: { errors }} = useFormContext()

  const editorContent = watch(args.field || "content");

  useEffect(() => {
    Quill.register('modules/markdownOptions', QuillMarkdown, true);
    register(args.field || "content",{ required:true, minLength:30, maxLength: 50000});
  },[register]);

  const onEditorStateChange = (content: string) => {
    setValue(args.field || "content", content);
  };

  // useEffect(() => {
  //   console.log('quill editor updates', editorContent, getValues(args.field || 'content'))
  // }, [editorContent])

  return (
    <div className="formControl">
      <label htmlFor={args.field || "content"} className="label cursor-pointer">
        {args.label || 'Compose your pact here:'}
      </label>  
          <ReactQuill 
            modules={modules}
            theme="snow" 
            placeholder="Compose here!"
            value={editorContent}
            onChange={onEditorStateChange}
          />
          {errors.content && 
            <label className="label">
              <span className="label-text-alt ">A petition text is required, minimum 15 characters</span>
          </label>
          }
    </div>
  )
}
