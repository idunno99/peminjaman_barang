import type { Metadata } from "next";
import "../globals.css";
import SidebarUser from "./components/SidebarUser";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata: Metadata = {
	title: "Dashboard",		
	description: "Dashboard User",
};

const LayoutUser = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth();
	if (!session || !session.user || session.user.role !== "user")
		redirect("/admin");

	return (
		<SidebarUser>
			<div className="container mr-0 xl:pr-5 p-10 w-5/6">
				<main>{children}</main>
			</div>
		</SidebarUser>
	);
};

export default LayoutUser;
