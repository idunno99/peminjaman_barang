import HeaderPage from "@/components/HeaderPage";
import React from "react";
import { BsFillHousesFill } from "react-icons/bs";

export const metadata = {
	title: "Ruangan",
};

const LayoutRuangan = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col gap-5">
			<HeaderPage>
				<BsFillHousesFill className="size-7" />
				<h1 className="text-lg">Ruangan</h1>
			</HeaderPage>
			{children}
		</div>
	);
};

export default LayoutRuangan;
