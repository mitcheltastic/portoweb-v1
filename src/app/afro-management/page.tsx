import { db } from "@/db";
import { messages } from "@/db/schema";
import { desc } from "drizzle-orm";
import MessageActions from "@/components/MessageActions";
import { FiTerminal, FiDatabase } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function AfroManagementDashboard() {
  const allMessages = await db
    .select()
    .from(messages)
    .orderBy(desc(messages.createdAt));

  const totalCount = allMessages.length;
  const unreadCount = allMessages.filter((m) => m.status === "unread").length;
  const readCount = allMessages.filter((m) => m.status === "read").length;
  const archivedCount = allMessages.filter((m) => m.status === "archived").length;

  return (
    <main className="max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-24 min-h-screen text-zinc-100 font-mono">
      {/* 1. Header Grid */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800 pb-8 mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 text-emerald-500 mb-2">
            <FiTerminal className="text-2xl animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800/40 text-emerald-400">
              Admin Terminal
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white font-sans">
            /afro-management
          </h1>
          <p className="text-zinc-500 text-sm mt-1 font-mono">
            Pipeline monitoring & incoming connection telemetry.
          </p>
        </div>

        {/* System Stats Block */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-zinc-950/60 border border-zinc-800/80 p-4 rounded-lg">
          <div className="px-2">
            <span className="text-[10px] text-zinc-500 uppercase block tracking-wider">Unread</span>
            <span className="text-2xl font-bold text-emerald-400">{unreadCount}</span>
          </div>
          <div className="px-2 border-l border-zinc-800/60">
            <span className="text-[10px] text-zinc-500 uppercase block tracking-wider">Read</span>
            <span className="text-2xl font-bold text-zinc-300">{readCount}</span>
          </div>
          <div className="px-2 border-l border-zinc-800/60">
            <span className="text-[10px] text-zinc-500 uppercase block tracking-wider">Archived</span>
            <span className="text-2xl font-bold text-zinc-600">{archivedCount}</span>
          </div>
          <div className="px-2 border-l border-zinc-800/60">
            <span className="text-[10px] text-zinc-500 uppercase block tracking-wider">Total</span>
            <span className="text-2xl font-bold text-white">{totalCount}</span>
          </div>
        </div>
      </div>

      {/* 2. Messages List */}
      {allMessages.length === 0 ? (
        <div className="border border-dashed border-zinc-800 rounded-lg p-12 text-center flex flex-col items-center justify-center bg-zinc-950/30">
          <FiDatabase className="text-4xl text-zinc-700 mb-4" />
          <p className="text-zinc-400 font-bold mb-1 text-sm">NO SIGNAL TRANSMISSIONS RECORDED</p>
          <p className="text-zinc-600 text-xs">Awaiting connection events from landing page input form.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {allMessages.map((msg) => {
            const isUnread = msg.status === "unread";
            const isArchived = msg.status === "archived";

            // Visual layout styling based on message status
            const cardStyles = isUnread
              ? "border-emerald-500/30 bg-emerald-950/5 shadow-[0_0_15px_-3px_rgba(16,185,129,0.05)] hover:border-emerald-500/40"
              : isArchived
              ? "border-zinc-900 bg-zinc-950/20 opacity-50 hover:opacity-80"
              : "border-zinc-800 bg-zinc-900/10 hover:border-zinc-700";

            // Formatted Date (Static UTC format for developer aesthetic)
            const formattedDate = msg.createdAt.toISOString().replace("T", " ").substring(0, 19) + " UTC";

            return (
              <div
                key={msg.id}
                className={`border rounded-lg p-6 transition-all duration-300 ${cardStyles}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4 mb-4">
                  {/* Sender Metadata */}
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-sans font-bold text-white text-base">
                        {msg.name}
                      </span>
                      <span className="text-zinc-600 text-xs">•</span>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-emerald-500/80 hover:text-emerald-400 text-xs underline transition-colors"
                      >
                        {msg.email}
                      </a>
                    </div>
                    <div className="text-[10px] text-zinc-500 tracking-wider">
                      SIGNAL TIMESTAMP: {formattedDate}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded font-bold border ${
                        isUnread
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 animate-pulse"
                          : isArchived
                          ? "bg-zinc-900/30 border-zinc-800 text-zinc-600"
                          : "bg-zinc-800/50 border-zinc-700/60 text-zinc-400"
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>
                </div>

                {/* Message Body Content */}
                <div className="mb-6 whitespace-pre-wrap text-zinc-300 text-sm leading-relaxed font-sans">
                  {msg.message}
                </div>

                {/* Footer and message actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-zinc-900/60 pt-4 gap-4 text-xs text-zinc-500 font-mono">
                  <span>PACKET_ID: {msg.id.toString().padStart(4, "0")}</span>
                  <MessageActions id={msg.id} status={msg.status} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
