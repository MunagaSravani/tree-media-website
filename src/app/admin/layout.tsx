import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  // Let login page render without redirect loop
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {token && verifyAdminToken(token) ? (
        <>
          <AdminSidebar />
          <main className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
            {children}
          </main>
        </>
      ) : (
        <main className="w-full min-h-screen">{children}</main>
      )}
    </div>
  );
}
