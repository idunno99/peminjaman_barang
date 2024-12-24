import Image from "next/image";
import { ButtonPinjam } from "./Button";
import Link from "next/link";

type CardProps = {
	img: string;
	label: string;
	id: string;
	title: string;
	jumlah?: number;
	lokasi?: string;
	status?: boolean;
	children: React.ReactNode;
};

const CardUser = ({
	img,
	label,
	id,
	jumlah,
	title,
	lokasi,
	status,
	children,
}: CardProps) => {
	return (
		<div className="shadow-xl card card-compact bg-primary">
			<figure className="relative aspect-square">
				<Image
					src={img}
					alt="Gambar Produk"
					fill
					priority
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="object-contain object-center w-full p-5 bg-white aspect-square"
				/>
			</figure>
			<div className="card-body">
				<Link href={`/${label}/${id}`}>
					<h2 className="card-title">{title}</h2>
				</Link>
				{lokasi && (
					<h2 className="text-sm text-white card-title badge badge-info">
						{lokasi}
					</h2>
				)}
				<p className="text-ellipsis line-clamp-2">{children}</p>
				<div className="flex flex-row flex-wrap items-center justify-between gap-2 md:flex-nowrap">
					<div className="px-2 py-1 rounded-md bg-base-100 text-primary">
						<p className="text-sm font-semibold">
							{(label === "perangkat" && "Stok : " + jumlah) ||
								(status ? "Tersedia" : "Dipinjam")}
						</p>
					</div>
					<div className="justify-end card-actions">
						<ButtonPinjam label={label} id={id} notTersedia={!status} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardUser;
