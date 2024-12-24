import HeaderPage from "@/components/HeaderPage";
import React from "react";
import { FaUser } from "react-icons/fa";

export const metadata = {
	title: "Pengguna",
};

const UserLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col gap-5">
			<HeaderPage>
				<FaUser className="size-7" />
				<h1 className="text-lg">Pengguna</h1>
			</HeaderPage>
			{children}
		</div>
	);
};

export default UserLayout;
