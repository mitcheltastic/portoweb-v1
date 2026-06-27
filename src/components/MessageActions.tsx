"use client";

import { useTransition } from "react";
import { Check, Archive, Trash, RefreshCw } from "lucide-react";
import { updateMessageStatus, deleteMessage } from "@/app/actions";

interface MessageActionsProps {
  id: number;
  status: "unread" | "read" | "archived";
}

export default function MessageActions({ id, status }: MessageActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (newStatus: "unread" | "read" | "archived") => {
    startTransition(async () => {
      await updateMessageStatus(id, newStatus);
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this transmission permanently?")) {
      startTransition(async () => {
        await deleteMessage(id);
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      {status === "unread" && (
        <button
          onClick={() => handleStatusChange("read")}
          disabled={isPending}
          className="p-2 bg-zinc-800/80 hover:bg-emerald-500/20 text-zinc-400 hover:text-emerald-400 rounded border border-zinc-700 transition-all hover:scale-105 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          title="Mark as Read"
          aria-label="Mark as Read"
        >
          <Check size={16} />
        </button>
      )}

      {status === "read" && (
        <button
          onClick={() => handleStatusChange("unread")}
          disabled={isPending}
          className="p-2 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 rounded border border-zinc-700 transition-all hover:scale-105 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          title="Mark as Unread"
          aria-label="Mark as Unread"
        >
          <RefreshCw size={16} />
        </button>
      )}

      {status !== "archived" ? (
        <button
          onClick={() => handleStatusChange("archived")}
          disabled={isPending}
          className="p-2 bg-zinc-800/80 hover:bg-amber-500/20 text-zinc-400 hover:text-amber-400 rounded border border-zinc-700 transition-all hover:scale-105 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          title="Archive Message"
          aria-label="Archive Message"
        >
          <Archive size={16} />
        </button>
      ) : (
        <button
          onClick={() => handleStatusChange("read")}
          disabled={isPending}
          className="p-2 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 rounded border border-zinc-700 transition-all hover:scale-105 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          title="Unarchive (Mark as Read)"
          aria-label="Unarchive"
        >
          <Archive size={16} className="rotate-180" />
        </button>
      )}

      <button
        onClick={handleDelete}
        disabled={isPending}
        className="p-2 bg-zinc-800/80 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded border border-zinc-700 transition-all hover:scale-105 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        title="Delete Transmission"
        aria-label="Delete Transmission"
      >
        <Trash size={16} />
      </button>

      {isPending && (
        <span className="text-[10px] font-mono text-emerald-500 animate-pulse ml-2">
          [ SYNCING... ]
        </span>
      )}
    </div>
  );
}
