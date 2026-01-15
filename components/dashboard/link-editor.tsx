/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, Trash2, GripVertical, Loader2, Pencil, X 
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getSocialIcon } from "@/components/icons/social-icons";

// Drag & Drop
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// --- TYPES DEFINITION ---
interface Link {
  id: string;
  user_id: string;
  title: string;
  url: string;
  is_social: boolean;
  social_position: "top" | "bottom" | null;
  display_order: number;
  created_at?: string;
}

interface SortableItemProps {
  link: Link;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Link>) => void;
}

// --- SUB-COMPONENT FOR ITEM ---
function SortableItem({ 
  link, 
  onDelete, 
  onUpdate 
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id });
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState({ title: link.title, url: link.url });

  const style = { 
    transform: CSS.Transform.toString(transform), 
    transition, 
    zIndex: isDragging ? 50 : "auto" 
  };

  const handleSave = () => {
    onUpdate(link.id, editValue);
    setIsEditing(false);
  };

  if (link.is_social) {
    return (
      <div ref={setNodeRef} style={style} className={cn(
        "relative group bg-white border border-zinc-200 rounded-2xl p-4 flex flex-col items-center gap-3 min-w-[110px] transition-all hover:border-zinc-400",
        isDragging && "opacity-50 scale-95 shadow-lg"
      )}>
        <div {...attributes} {...listeners} className="cursor-grab opacity-20 hover:opacity-100 transition-opacity">
          <GripVertical className="w-4 h-4" />
        </div>
        <div className="scale-110">{getSocialIcon(link.url)}</div>
        <span className="text-[10px] font-bold uppercase tracking-wider truncate w-full text-center text-zinc-500">{link.title}</span>
        <button 
          onClick={() => onDelete(link.id)} 
          className="absolute -top-2 -right-2 bg-white border border-zinc-100 shadow-sm text-red-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} className={cn(
      "group bg-white border border-zinc-200 rounded-[2rem] p-5 flex items-center gap-4 transition-all hover:border-zinc-400 hover:shadow-sm",
      isDragging && "shadow-xl border-zinc-900/10 opacity-80"
    )}>
      <div {...attributes} {...listeners} className="cursor-grab text-zinc-300 hover:text-zinc-900 transition-colors">
        <GripVertical className="w-5 h-5" />
      </div>
      
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <Input 
              value={editValue.title} 
              onChange={e => setEditValue({...editValue, title: e.target.value})} 
              className="h-10 font-bold rounded-xl border-zinc-200"
              placeholder="Title"
            />
            <Input 
              value={editValue.url} 
              onChange={e => setEditValue({...editValue, url: e.target.value})} 
              className="h-10 text-xs rounded-xl border-zinc-100 bg-zinc-50/50"
              placeholder="URL"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave} className="rounded-full bg-zinc-900 text-white px-4 h-8 text-[10px] font-bold uppercase">Save</Button>
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)} className="rounded-full h-8 text-[10px] font-bold uppercase">Cancel</Button>
            </div>
          </div>
        ) : (
          <div onClick={() => setIsEditing(true)} className="cursor-pointer">
            <h4 className="font-bold text-zinc-900 tracking-tight">{link.title}</h4>
            <p className="text-xs text-zinc-400 truncate tracking-tight">{link.url}</p>
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} className="rounded-full h-9 w-9 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100">
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(link.id)} className="rounded-full h-9 w-9 text-zinc-400 hover:text-red-500 hover:bg-red-50">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

// --- MAIN COMPONENT ---
export function LinkEditor({ userId }: { userId: string }) {
  const [links, setLinks] = useState<Link[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"link" | "social">("link");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [socialPosition, setSocialPosition] = useState<"top" | "bottom">("bottom");

  const supabase = createClient();
  const sensors = useSensors(
    useSensor(PointerSensor), 
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchLinks = useCallback(async () => {
    const { data } = await supabase
      .from("links")
      .select("*")
      .eq("user_id", userId)
      .order("display_order", { ascending: true });
    
    if (data) setLinks(data as Link[]);
  }, [supabase, userId]);

  useEffect(() => { fetchLinks(); }, [fetchLinks]);

  const addLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("links").insert([{
      user_id: userId,
      title: mode === "social" ? "Social" : title,
      url,
      is_social: mode === "social",
      social_position: mode === "social" ? socialPosition : null,
      display_order: links.length,
    }]);
    if (!error) { setTitle(""); setUrl(""); setIsAdding(false); fetchLinks(); }
    setLoading(false);
  };

  const handleDragEnd = async (event: DragEndEvent, filterFn: (l: Link) => boolean) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const filteredLinks = links.filter(filterFn);
    const otherLinks = links.filter(l => !filterFn(l));
    
    const oldIndex = filteredLinks.findIndex((l) => l.id === active.id);
    const newIndex = filteredLinks.findIndex((l) => l.id === over.id);
    
    const reorderedFiltered = arrayMove(filteredLinks, oldIndex, newIndex);
    const combined = [...reorderedFiltered, ...otherLinks];
    
    // Update local state first for snappiness
    setLinks(combined);

    // Persist to DB
    await supabase.from("links").upsert(
      combined.map((link, index) => ({ 
        id: link.id,
        user_id: link.user_id,
        title: link.title,
        url: link.url,
        is_social: link.is_social,
        social_position: link.social_position,
        display_order: index 
      }))
    );
  };

  const renderSection = (label: string, filterFn: (l: Link) => boolean, strategy: any) => {
    const sectionLinks = links.filter(filterFn);
    if (sectionLinks.length === 0) return null;

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-px w-6 bg-zinc-200" />
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">{label}</h3>
        </div>
        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCenter} 
          onDragEnd={(e) => handleDragEnd(e, filterFn)}
        >
          <SortableContext items={sectionLinks.map(l => l.id)} strategy={strategy}>
            <div className={cn(
              "grid gap-4",
              label.includes("Social") ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" : "grid-cols-1"
            )}>
              {sectionLinks.map(link => (
                <SortableItem 
                  key={link.id} 
                  link={link} 
                  onDelete={async (id) => {
                    await supabase.from("links").delete().eq("id", id);
                    fetchLinks();
                  }} 
                  onUpdate={async (id, updates) => {
                    await supabase.from("links").update(updates).eq("id", id);
                    fetchLinks();
                  }} 
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {!isAdding ? (
        <Button 
          onClick={() => setIsAdding(true)} 
          className="w-full h-20 rounded-[2.5rem] border-2 border-dashed border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-400 text-zinc-500 hover:text-zinc-900 transition-all group"
        >
          <div className="flex flex-col items-center gap-1">
            <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Add New Link or Social</span>
          </div>
        </Button>
      ) : (
        <Card className="p-8 border border-zinc-200 rounded-[3rem] bg-white shadow-2xl shadow-zinc-200/50 animate-in fade-in zoom-in-95 duration-300 relative">
          <button onClick={() => setIsAdding(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-100 text-zinc-400"><X className="w-4 h-4" /></button>
          
          <div className="flex bg-zinc-100 p-1 rounded-2xl mb-8 w-fit mx-auto">
            <button onClick={() => setMode("link")} className={cn("px-6 py-2 rounded-xl text-[10px] font-bold uppercase transition-all", mode === "link" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-400")}>Link</button>
            <button onClick={() => setMode("social")} className={cn("px-6 py-2 rounded-xl text-[10px] font-bold uppercase transition-all", mode === "social" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-400")}>Social</button>
          </div>

          <form onSubmit={addLink} className="space-y-4 max-w-md mx-auto">
            {mode === "link" && <Input placeholder="Link Title (e.g. My Portfolio)" value={title} onChange={(e) => setTitle(e.target.value)} required className="h-12 rounded-xl border-zinc-200 focus:ring-zinc-900" />}
            <Input placeholder="URL (https://...)" value={url} onChange={(e) => setUrl(e.target.value)} required className="h-12 rounded-xl border-zinc-200 focus:ring-zinc-900" />
            
            {mode === "social" && (
              <div className="flex items-center gap-3 py-2">
                <span className="text-[10px] font-bold text-zinc-400 uppercase">Position:</span>
                <div className="flex gap-2">
                  {["top", "bottom"].map((pos) => (
                    <button 
                      key={pos}
                      type="button" 
                      onClick={() => setSocialPosition(pos as any)}
                      className={cn("px-4 py-1.5 rounded-lg text-[9px] font-bold uppercase border transition-all", socialPosition === pos ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-400 border-zinc-200")}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <Button type="submit" disabled={loading} className="w-full h-12 rounded-full bg-zinc-900 text-white font-bold uppercase text-[10px] tracking-widest mt-4">
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Save Link"}
            </Button>
          </form>
        </Card>
      )}

      <div className="space-y-16">
        {renderSection("Social Icons (Top)", l => l.is_social && l.social_position === 'top', verticalListSortingStrategy)}
        {renderSection("Main Buttons", l => !l.is_social, verticalListSortingStrategy)}
        {renderSection("Social Icons (Bottom)", l => l.is_social && l.social_position === 'bottom', verticalListSortingStrategy)}
      </div>
    </div>
  );
}