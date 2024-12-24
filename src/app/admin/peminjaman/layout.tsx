import HeaderPage from "@/components/HeaderPage";
import type { Metadata } from "next";
import { MdHistory } from "react-icons/md";

export const metadata: Metadata = {
	title: "Peminjaman",
	description: "Halaman Admin",
};

const LayoutPeminjaman = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col gap-5">
			<HeaderPage>
				<MdHistory className="size-7" />
				<h1 className="text-lg">Peminjaman Pengguna</h1>
			</HeaderPage>
			{children}
		</div>
	);
};

export default LayoutPeminjaman;
