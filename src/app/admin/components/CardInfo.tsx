import Link from "next/link";
import React from "react";

type CardProps = {
	label: string;
	value: number | null;
	children?: React.ReactNode;
};

export const CardInfoTersedia = ({ label, value, children }: CardProps) => {
	return (
		<div className="bg-neutral cardInfo">
			<div>
				<h1>{label} Tersedia</h1>
				<p>{value}</p>
			</div>
			{children}
		</div>
	);
};

export const CardInfoDipinjam = ({ label, value, children }: CardProps) => {
	return (
		<div className="bg-success cardInfo">
			<div>
				<h1>{label}</h1>
				<p>{value}</p>
			</div>
			{children}
		</div>
	);
};

export const CardInfoTotal = ({ label, value, children }: CardProps) => {
	return (
		<div className="flex-col items-center justify-center w-1/2 bg-secondary cardInfo">
			<Link href={`/admin/${label.toLowerCase()}`}>
				{children}
				<div>
					<h1>Total {label}</h1>
					<p>{value}</p>
				</div>
			</Link>
		</div>
	);
};
