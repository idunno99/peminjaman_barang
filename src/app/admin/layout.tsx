import type { Metadata } from "next";
import "../globals.css";
import SidebarAdmin from "@/app/admin/components/SidebarAdmin";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Dashboard Admin",
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth();

	if (!session || !session.user || session.user.role !== "admin") redirect("/");

	return (
		<SidebarAdmin>
			<div className="container px-5 py-10 overflow-hidden">
				<main>{children}</main>
			</div>
		</SidebarAdmin>
	);
};

export default AdminLayout;
