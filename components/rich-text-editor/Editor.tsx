"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

import { MenuBar } from "./MenuBar"; 

const RichTextEditor = ({field}:{field:any}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"], // allow alignment on headings & paragraphs
      }),
    ],
    editorProps:{
       attributes: {
        
      class: 'w-full min-h-[300px] px-4  prose prose-sm sm:prose lg:prose-lg xl:prose-2xl dark:prose-invert  focus:outline-none !w-full !max-w-none',
    },
    },
    onUpdate:({editor})=>{
       field.onChange(JSON.stringify(editor.getHTML()))


    },
    content:field.value? JSON.stringify(field.value):'<p>Start writing...</p>',
    immediatelyRender: false, // SSR safe
  });

  return (
    <div className="w-full border border-input overflow-hidden rounded-lg dark:bg-input/30">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
