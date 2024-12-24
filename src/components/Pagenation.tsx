"use client";

import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { FaLeftLong, FaRightLong } from "react-icons/fa6";
import { generatePagination } from "@/lib/utils";

const Pagenation = ({ totalPages }: { totalPages: number }) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get("page")) || 1;

	const createPageURL = (pageNumber: string | number) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", pageNumber.toString());
		return `${pathname}?${params.toString()}`;
	};

	const allPages = generatePagination(currentPage, totalPages);

	const PaginationNumber = ({
		page,
		href,
		position,
		isActive,
	}: {
		page: number | string;
		href: string;
		position?: "first" | "last" | "middle" | "single";
		isActive: boolean;
	}) => {
		const className = clsx("join-item btn text-primary font-semibold", {
			"btn-primary text-white": isActive,
			"btn-disabled": position === "middle",
		});

		return isActive && position === "middle" ? (
			<div className={className}>{page}</div>
		) : (
			<Link href={href} className={className}>
				{page}
			</Link>
		);
	};

	const PaginationArrrow = ({
		href,
		direction,
		isDisabled,
	}: {
		href: string;
		direction: "left" | "right";
		isDisabled?: boolean;
	}) => {
		const className = clsx("join-item btn", {
			"text-primary cursor-not-allowed": isDisabled,
			"text-white btn-neutral": !isDisabled,
		});

		const icon = direction === "left" ? <FaLeftLong /> : <FaRightLong />;

		return isDisabled ? (
			<div className={className}>{icon}</div>
		) : (
			<Link href={href} className={className}>
				{icon}
			</Link>
		);
	};

	return (
		<div className="join">
			<PaginationArrrow
				direction="left"
				href={createPageURL(currentPage - 1)}
				isDisabled={currentPage <= 1}
			/>

			{allPages.map((page, index) => {
				let position: "first" | "last" | "single" | "middle" | undefined;

				if (index === 0) position = "first";
				if (index === allPages.length - 1) position = "last";
				if (allPages.length === 1) position = "single";
				if (page === "...") position = "middle";

				return (
					<PaginationNumber
						key={index}
						href={createPageURL(page)}
						page={page}
						position={position}
						isActive={currentPage === page}
					/>
				);
			})}

			<PaginationArrrow
				direction="right"
				href={createPageURL(currentPage + 1)}
				isDisabled={currentPage >= totalPages}
			/>
		</div>
	);
};

export default Pagenation;
