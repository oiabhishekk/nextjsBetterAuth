"use client";

import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type MenuBarProps = {
  editor: Editor | null;
};

export function MenuBar({ editor }: MenuBarProps) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 border rounded-md p-2 mb-4 shadow-sm">
      {/* Bold */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              "rounded-sm p-1 transition ",
              editor.isActive("bold")
                ? "bg-black text-muted-foreground"
                : "hover:bg-sidebar"
            )}
          >
            <Bold size={16} />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Bold</TooltipContent>
      </Tooltip>

      {/* Italic */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              "rounded-sm p-1 transition",
              editor.isActive("italic")
                ? "bg-black text-white"
                : "hover:bg-sidebar"
            )}
          >
            <Italic size={16} />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Italic</TooltipContent>
      </Tooltip>

      {/* Strikethrough */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            className={cn(
              "rounded-sm p-1 transition",
              editor.isActive("strike")
                ? "bg-black text-white"
                : "hover:bg-sidebar"
            )}
          >
            <Strikethrough size={16} />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Strikethrough</TooltipContent>
      </Tooltip>

      {/* Heading 1 */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 1 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={cn(
              "rounded-sm p-1 transition",
              editor.isActive("heading", { level: 1 })
                ? "bg-black text-white"
                : "hover:bg-sidebar"
            )}
          >
            <Heading1 size={16} />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Heading 1</TooltipContent>
      </Tooltip>

      {/* Heading 2 */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 2 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={cn(
              "rounded-sm p-1 transition",
              editor.isActive("heading", { level: 2 })
                ? "bg-black text-white"
                : "hover:bg-sidebar"
            )}
          >
            <Heading2 size={16} />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Heading 2</TooltipContent>
      </Tooltip>
      {/* Heading 3 */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 3 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={cn(
              "rounded-sm p-1 transition",
              editor.isActive("heading", { level: 3 })
                ? "bg-black text-white"
                : "hover:bg-sidebar"
            )}
          >
            <Heading3 size={16} />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Heading 2</TooltipContent>
      </Tooltip>

      {/* Bullet List */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
            className={cn(
              "rounded-sm p-1 transition",
              editor.isActive("bulletList")
                ? "bg-black text-white"
                : "hover:bg-sidebar"
            )}
          >
            <List size={16} />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Bullet List</TooltipContent>
      </Tooltip>

      {/* Ordered List */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            pressed={editor.isActive("orderedList")}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
            className={cn(
              "rounded-sm p-1 transition",
              editor.isActive("orderedList")
                ? "bg-black text-white"
                : "hover:bg-sidebar"
            )}
          >
            <ListOrdered size={16} />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Ordered List</TooltipContent>
      </Tooltip>
    </div>
  );
}
