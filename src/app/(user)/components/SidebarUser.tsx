"use client";

import { LogOut } from "@/lib/_actions/login";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFormStatus } from "react-dom";
import { BsFillHousesFill } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { MdDashboard, MdDevices, MdHistory, MdLogout } from "react-icons/md";

const SidebarUser = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	const { pending } = useFormStatus();
	return (
		<div className="drawer">
			<input type="checkbox" id="my-drawer-3" className="drawer-toggle" />
			<div className="flex flex-row drawer-content">
				<div className="fixed z-50 flex flex-col items-center justify-start w-1/6 min-h-screen gap-5 px-2 py-10 text-white bg-primary rounded-r-2xl">
					<div className="lg:hidden">
						<label
							htmlFor="my-drawer-3"
							aria-label="open sidebar"
							className="btn btn-square btn-ghost">
							<IoMenu className="size-6" />
						</label>
					</div>
					<Link href="/">
						<h1 className="hidden px-5 py-2 text-2xl font-extrabold text-center bg-white shadow-md place-content-center lg:px-10 lg:block">
							<span className="text-[#0394DE]">P</span>
							<span className="text-[#E88C13]">B</span>
							<span className="text-[#68BB2B]">R</span>
						</h1>
					</Link>
					<ul className="w-full gap-3 content-center menu p-0 *:content-center *:md:content-normal">
						<li>
							<Link href="/" className={`${pathname === "/" ? "active" : ""} `}>
								<MdDashboard />
								<span className="hidden lg:block">Dashboard</span>
							</Link>
						</li>
						<li>
							<Link
								href="/perangkat"
								className={`${
									pathname.startsWith("/perangkat") ? "active" : ""
								} `}>
								<MdDevices />
								<span className="hidden lg:block">Perangkat TI</span>
							</Link>
						</li>
						<li>
							<Link
								href="/ruangan"
								className={`${
									pathname.startsWith("/ruangan") ? "active" : ""
								} `}>
								<BsFillHousesFill />
								<span className="hidden lg:block">Ruangan</span>
							</Link>
						</li>
						<li>
							<Link
								href="/peminjaman"
								className={`${
									pathname.startsWith("/peminjaman") ? "active" : ""
								} `}>
								<MdHistory />
								<span className="hidden lg:block">Peminjaman</span>
							</Link>
						</li>
						<li>
							<form action={LogOut} className="p-0 m-auto">
								<button
									type="submit"
									disabled={pending}
									className="flex justify-between btn btn-ghost">
									<span className="hidden lg:block">Logout</span>
									<MdLogout />
								</button>
							</form>
						</li>
					</ul>
				</div>
				{children}
			</div>
			<div className="z-50 drawer-side">
				<label
					htmlFor="my-drawer-3"
					aria-label="close sidebar"
					className="drawer-overlay"></label>
				<ul className="w-4/5 min-h-full gap-2 py-5 text-white rounded-r-lg bg-primary menu">
					<li>
						<Link href="/" className={`${pathname === "/" ? "active" : ""} `}>
							<MdDashboard />
							Dashboard
						</Link>
					</li>
					<li>
						<Link
							href="/perangkat"
							className={`${
								pathname.startsWith("/perangkat") ? "active" : ""
							} `}>
							<MdDevices />
							Perangkat TI
						</Link>
					</li>
					<li>
						<Link
							href="/ruangan"
							className={`${pathname.startsWith("/ruangan") ? "active" : ""} `}>
							<BsFillHousesFill />
							Ruangan
						</Link>
					</li>
					<li>
						<Link
							href="/peminjaman"
							className={`${
								pathname.startsWith("/peminjaman") ? "active" : ""
							} `}>
							<MdHistory />
							Peminjaman
						</Link>
					</li>
					<li>
						<form action={LogOut}>
							<button
								type="submit"
								disabled={pending}
								className="flex justify-between btn btn-ghost">
								Logout
								<MdLogout />
							</button>
						</form>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SidebarUser;
