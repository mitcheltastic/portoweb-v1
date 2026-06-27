import AdminSidebar from "@/components/AdminSidebar";

export default function AfroManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-zinc-950">
        {children}
      </main>
    </div>
  );
}
