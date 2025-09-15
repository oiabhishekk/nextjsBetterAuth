// "use client";

// import { type Editor } from "@tiptap/react";
// import {
//   Bold,
//   Italic,
//   Strikethrough,
//   Heading1,
//   Heading2,
//   Heading3,
//   List,
//   ListOrdered,
// } from "lucide-react";
// import { Toggle } from "@/components/ui/toggle";
// import {
//   Tooltip,
//   TooltipTrigger,
//   TooltipContent,
// } from "@/components/ui/tooltip";
// import { cn } from "@/lib/utils";

// type MenuBarProps = {
//   editor: Editor | null;
// };

// export function MenuBar({ editor }: MenuBarProps) {
//   if (!editor) return null;

//   return (
//     <div className="flex flex-wrap gap-2 border rounded-md p-2 mb-4 shadow-sm">
//       <div>
//         {/* Bold */}
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Toggle
//             size="sm"
//             pressed={editor.isActive("bold")}
//             onPressedChange={() => editor.chain().focus().toggleBold().run()}
//             className={cn(
//               "rounded-sm p-1 transition ",
//               editor.isActive("bold")
//                 ? "bg-black text-muted-foreground"
//                 : "hover:bg-sidebar"
//             )}
//           >
//             <Bold size={16} />
//           </Toggle>
//         </TooltipTrigger>
//         <TooltipContent>Bold</TooltipContent>
//       </Tooltip>

//       {/* Italic */}
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Toggle
//             size="sm"
//             pressed={editor.isActive("italic")}
//             onPressedChange={() => editor.chain().focus().toggleItalic().run()}
//             className={cn(
//               "rounded-sm p-1 transition",
//               editor.isActive("italic")
//                 ? "bg-black text-white"
//                 : "hover:bg-sidebar"
//             )}
//           >
//             <Italic size={16} />
//           </Toggle>
//         </TooltipTrigger>
//         <TooltipContent>Italic</TooltipContent>
//       </Tooltip>

//       {/* Strikethrough */}
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Toggle
//             size="sm"
//             pressed={editor.isActive("strike")}
//             onPressedChange={() => editor.chain().focus().toggleStrike().run()}
//             className={cn(
//               "rounded-sm p-1 transition",
//               editor.isActive("strike")
//                 ? "bg-black text-white"
//                 : "hover:bg-sidebar"
//             )}
//           >
//             <Strikethrough size={16} />
//           </Toggle>
//         </TooltipTrigger>
//         <TooltipContent>Strikethrough</TooltipContent>
//       </Tooltip>

//       {/* Heading 1 */}
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Toggle
//             size="sm"
//             pressed={editor.isActive("heading", { level: 1 })}
//             onPressedChange={() =>
//               editor.chain().focus().toggleHeading({ level: 1 }).run()
//             }
//             className={cn(
//               "rounded-sm p-1 transition",
//               editor.isActive("heading", { level: 1 })
//                 ? "bg-black text-white"
//                 : "hover:bg-sidebar"
//             )}
//           >
//             <Heading1 size={16} />
//           </Toggle>
//         </TooltipTrigger>
//         <TooltipContent>Heading 1</TooltipContent>
//       </Tooltip>

//       {/* Heading 2 */}
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Toggle
//             size="sm"
//             pressed={editor.isActive("heading", { level: 2 })}
//             onPressedChange={() =>
//               editor.chain().focus().toggleHeading({ level: 2 }).run()
//             }
//             className={cn(
//               "rounded-sm p-1 transition",
//               editor.isActive("heading", { level: 2 })
//                 ? "bg-black text-white"
//                 : "hover:bg-sidebar"
//             )}
//           >
//             <Heading2 size={16} />
//           </Toggle>
//         </TooltipTrigger>
//         <TooltipContent>Heading 2</TooltipContent>
//       </Tooltip>
//       {/* Heading 3 */}
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Toggle
//             size="sm"
//             pressed={editor.isActive("heading", { level: 3 })}
//             onPressedChange={() =>
//               editor.chain().focus().toggleHeading({ level: 2 }).run()
//             }
//             className={cn(
//               "rounded-sm p-1 transition",
//               editor.isActive("heading", { level: 3 })
//                 ? "bg-black text-white"
//                 : "hover:bg-sidebar"
//             )}
//           >
//             <Heading3 size={16} />
//           </Toggle>
//         </TooltipTrigger>
//         <TooltipContent>Heading 2</TooltipContent>
//       </Tooltip>

//       {/* Bullet List */}
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Toggle
//             size="sm"
//             pressed={editor.isActive("bulletList")}
//             onPressedChange={() =>
//               editor.chain().focus().toggleBulletList().run()
//             }
//             className={cn(
//               "rounded-sm p-1 transition",
//               editor.isActive("bulletList")
//                 ? "bg-black text-white"
//                 : "hover:bg-sidebar"
//             )}
//           >
//             <List size={16} />
//           </Toggle>
//         </TooltipTrigger>
//         <TooltipContent>Bullet List</TooltipContent>
//       </Tooltip>

//       {/* Ordered List */}
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Toggle
//             size="sm"
//             pressed={editor.isActive("orderedList")}
//             onPressedChange={() =>
//               editor.chain().focus().toggleOrderedList().run()
//             }
//             className={cn(
//               "rounded-sm p-1 transition",
//               editor.isActive("orderedList")
//                 ? "bg-black text-white"
//                 : "hover:bg-sidebar"
//             )}
//           >
//             <ListOrdered size={16} />
//           </Toggle>
//         </TooltipTrigger>
//         <TooltipContent>Ordered List</TooltipContent>
//       </Tooltip>
    
//       </div>
//       <div>
//         {/* three tool for aligning the text */}

//       </div>
//       <div>

//       </div>
//       {/* 2 for undo and redo */}
//       </div>
//   );
// }
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
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo2,
  Redo2,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type MenuBarProps = {
  editor: Editor | null;
};

export function MenuBar({ editor }: MenuBarProps) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 border border-t-0 border-x-0 rounded-md p-2 mb-4 shadow-sm">
      {/* Text Formatting */}
      <div className="flex gap-2">
        {/* Bold */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive("bold")}
              onPressedChange={() =>
                editor.chain().focus().toggleBold().run()
              }
              className={cn(
                "rounded-sm p-1 transition",
                editor.isActive("bold")
                  ? "bg-black text-white"
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
              onPressedChange={() =>
                editor.chain().focus().toggleItalic().run()
              }
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
              onPressedChange={() =>
                editor.chain().focus().toggleStrike().run()
              }
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
      </div>

      <div className="w-px bg-border mx-2" />


      {/* Headings */}
      <div className="flex gap-2">
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
                editor.chain().focus().toggleHeading({ level: 3 }).run()
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
          <TooltipContent>Heading 3</TooltipContent>
        </Tooltip>
      </div>

      <div className="w-px bg-border mx-2" />

      {/* Lists */}
      <div className="flex gap-2">
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

      <div className="w-px bg-border mx-2" />

      {/* Alignment */}
      <div className="flex gap-2">
        {/* Align Left */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive({ textAlign: "left" })}
              onPressedChange={() =>
                editor.chain().focus().setTextAlign("left").run()
              }
              className={cn(
                "rounded-sm p-1 transition",
                editor.isActive({ textAlign: "left" })
                  ? "bg-black text-white"
                  : "hover:bg-sidebar"
              )}
            >
              <AlignLeft size={16} />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Align Left</TooltipContent>
        </Tooltip>

        {/* Align Center */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive({ textAlign: "center" })}
              onPressedChange={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={cn(
                "rounded-sm p-1 transition",
                editor.isActive({ textAlign: "center" })
                  ? "bg-black text-white"
                  : "hover:bg-sidebar"
              )}
            >
              <AlignCenter size={16} />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Align Center</TooltipContent>
        </Tooltip>

        {/* Align Right */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive({ textAlign: "right" })}
              onPressedChange={() =>
                editor.chain().focus().setTextAlign("right").run()
              }
              className={cn(
                "rounded-sm p-1 transition",
                editor.isActive({ textAlign: "right" })
                  ? "bg-black text-white"
                  : "hover:bg-sidebar"
              )}
            >
              <AlignRight size={16} />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Align Right</TooltipContent>
        </Tooltip>
      </div>

            <div className="w-px bg-border mx-2" />


      {/* Undo / Redo */}
      <div className="flex gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={!editor.can().undo()}
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().undo().run()}
            >
              <Undo2 size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              type="button"
              disabled={!editor.can().redo()}

              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().redo().run()}
            >
              <Redo2 size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
