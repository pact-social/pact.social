import { CodeBracketSquareIcon } from "@heroicons/react/20/solid";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
import { type Editor } from "@tiptap/react";
import { Fragment, useCallback, type ReactNode, useRef, useEffect } from "react";

type MenuItemType = {
  icon?: string;
  title?: string;
  action?: () => void;
  isActive?: null | (() => boolean);
  type?: 'divider'
}

const MenuItem = ({
  icon,
  title,
  action,
  isActive = null,
}: MenuItemType) => {
  return (
    <div 
      className={`btn btn-sm join-item ${isActive && isActive() ? ' btn-active' : ''}`}
      onClick={action}
      title={title}
    >
      <svg className="remix w-4 h-4">
        <use xlinkHref={`/fonts/remixicon.symbol.svg#ri-${icon}`} />
      </svg>
    </div>
  )
}

export default function EditorMenuBar ({ editor }: { editor: Editor}) {

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)
    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])


  const setYoutube = useCallback(() => {
    const previousUrl = editor.getAttributes('youtube').href
    const url = window.prompt('URL', previousUrl)
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.commands.setYoutubeVideo({
      src: url,
      width: 320,
      height: 180,
    })
  }, [editor])

  const items: Array<MenuItemType> = [
    {
      icon: 'bold',
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: 'italic',
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: 'strikethrough',
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      icon: 'underline',
      title: 'Underline',
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: () => editor.isActive('underline'),
    },
    {
      icon: 'code-view',
      title: 'Code',
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive('code'),
    },
    // {
    //   icon: 'mark-pen-line',
    //   title: 'Highlight',
    //   action: () => editor.chain().focus().toggleHighlight().run(),
    //   isActive: () => editor.isActive('highlight'),
    // },
    {
      type: 'divider',
    },
    {
      icon: 'h-2',
      title: 'Heading 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      icon: 'h-3',
      title: 'Heading 3',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
    // {
    //   icon: 'paragraph',
    //   title: 'Paragraph',
    //   action: () => editor.chain().focus().setParagraph().run(),
    //   isActive: () => editor.isActive('paragraph'),
    // },
    {
      icon: 'list-unordered',
      title: 'Bullet List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: 'list-ordered',
      title: 'Ordered List',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    // {
    //   icon: 'list-check-2',
    //   title: 'Task List',
    //   action: () => editor.chain().focus().toggleTaskList().run(),
    //   isActive: () => editor.isActive('taskList'),
    // },
    {
      icon: 'code-box-line',
      title: 'Code Block',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
    {
      type: 'divider',
    },
    {
      icon: 'double-quotes-l',
      title: 'Blockquote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      icon: 'separator',
      title: 'Horizontal Rule',
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      type: 'divider',
    },
    // {
    //   icon: 'text-wrap',
    //   title: 'Hard Break',
    //   action: () => editor.chain().focus().setHardBreak().run(),
    // },
    // {
    //   icon: 'format-clear',
    //   title: 'Clear Format',
    //   action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    // },
    {
      type: 'divider',
    },
    {
      icon: 'arrow-go-back-line',
      title: 'Undo',
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: 'arrow-go-forward-line',
      title: 'Redo',
      action: () => editor.chain().focus().redo().run(),
    },
    {
      icon: 'link',
      title: 'Link',
      action: setLink,
      isActive: () => editor.isActive('link'),
    },
    {
      icon: 'video',
      title: 'Youtube',
      action: setYoutube,
      // isActive: () => editor.isActive('youtube'),
    }
  ]
  return (
    <div className="sticky top-[5rem] z-10">
      <div className="join flex-wrap ">
        {items.map((item, index) => (
          <Fragment key={index}>
            {item.type === 'divider' ? <div className="divider" /> : <MenuItem {...item} />}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
