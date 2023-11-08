import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import { htmlToMarkdown } from '../../lib/mdUtils';
import Youtube from '@tiptap/extension-youtube';
import EditorMenuBar from './editorMenuBar';


export type RteFieldType = {
  label?: string;
  field?: string;
}

const Tiptap = ({ editor }: { editor: Editor}) => {
  return (
    <>
      {editor && <EditorMenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </>
  )
}

export default function MarkdownField(args: RteFieldType) {
  const { register, setValue, getValues, watch, formState: { errors }} = useFormContext()
  const editorContent = watch(args.field || "content");
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose p-2 font-sans dark:prose-invert",
      },
    },
    extensions: [
      StarterKit.configure({
        // history: false,
        // heading: {
        //   levels: [1, 2, 3, 4, 5, 6],
        //   HTMLAttributes: {
        //     class: "font-semibold",
        //   },
        // },
        // paragraph: {
        //   HTMLAttributes: {},
        // },
      }),
      Underline,
      Link.configure({
        autolink: false,
      }),
      Youtube.configure({
        width: 480,
      })
    ],
    onUpdate: ({editor}) => {
      setValue(args.field || "content", editor.getHTML());
    },
    content: editorContent,
  })

  useEffect(() => {
    // Quill.register('modules/markdownOptions', QuillMarkdown, true);
    register(args.field || "content",{ required:true, minLength:30, maxLength: 50000});
  }, [args.field, register]);

  // const onEditorStateChange = (content: string) => {
  //   setValue(args.field || "content", content);
  // };

  useEffect(() => {
  }, [args.field, editorContent, getValues])

  return (
    <div className="formControl">
      <label htmlFor={args.field || "content"} className="label cursor-pointer">
        {args.label || 'Compose your pact here:'}
      </label>
      <div className="border rounded-xl">
        {editor &&
          <Tiptap
            editor={editor}
          />
        }
      </div>
          {/* <ReactQuill 
            modules={modules}
            theme="snow" 
            placeholder="Compose here!"
            value={editorContent}
            onChange={onEditorStateChange}
          /> */}
          {errors.content && 
            <label className="label">
              <span className="label-text-alt ">A petition text is required, minimum 15 characters</span>
          </label>
          }
    </div>
  )
}
