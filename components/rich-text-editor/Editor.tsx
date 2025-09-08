"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    // content: '<p>Hello World! 🌎️</p>',
    // // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  return <MenuBar editor={editor} />;
};

export default RichTextEditor;
