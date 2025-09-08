"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

type MenuBarProps = {
  editor: Editor | null;
};

export function MenuBar({ editor }: MenuBarProps) {
  const [active, setActive] = useState({
    bold: false,
    italic: false,
    strike: false,
    h1: false,
    h2: false,
    bulletList: false,
    orderedList: false,
  });
  useEffect(() => {
    if (!editor) return;

    const update = () => {
      console.log("active.bold");
      console.log(active.bold);
      setActive({
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        strike: editor.isActive("strike"),
        h1: editor.isActive("heading", { level: 1 }),
        h2: editor.isActive("heading", { level: 2 }),
        bulletList: editor.isActive("bulletList"),
        orderedList: editor.isActive("orderedList"),
      });
    };

    update();
    editor.on("update", update);
    editor.on("selectionUpdate", update);

    return () => {
      editor.off("update", update);
      editor.off("selectionUpdate", update);
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 border rounded-md p-2 mb-4 shadow-sm">
      {/* Bold */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="sm"
            variant={active.bold ? "default" : "outline"}
            onClick={() => {
              console.log(editor.isActive("bold"));
              editor.chain().focus().toggleBold().run();
            }}
          >
            <Bold size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Bold</TooltipContent>
      </Tooltip>

      {/* Italic */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="sm"
            variant={active.italic ? "default" : "outline"}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Italic</TooltipContent>
      </Tooltip>

      {/* Strikethrough */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="sm"
            variant={active.strike ? "default" : "outline"}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Strikethrough</TooltipContent>
      </Tooltip>

      {/* Heading 1 */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="sm"
            variant={active.h1 ? "default" : "outline"}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Heading 1</TooltipContent>
      </Tooltip>

      {/* Heading 2 */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="sm"
            variant={active.h2 ? "default" : "outline"}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Heading 2</TooltipContent>
      </Tooltip>

      {/* Bullet List */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="sm"
            variant={active.bulletList ? "default" : "outline"}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Bullet List</TooltipContent>
      </Tooltip>

      {/* Ordered List */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="sm"
            variant={active.orderedList ? "default" : "outline"}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Ordered List</TooltipContent>
      </Tooltip>
    </div>
  );
}
