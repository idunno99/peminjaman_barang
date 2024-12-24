import React from "react";

const HeaderPage = ({children} : {children: React.ReactNode}) => {
	return (
		<div className="flex items-center flex-wrap w-full gap-3 p-3 font-semibold rounded-md cursor-default bg-primary">
			{children}
		</div>
	);
};

export default HeaderPage;
