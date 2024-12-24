import "../globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="container flex items-center justify-center w-full h-screen p-10 overflow-hidden">
			<div className="p-5 rounded-lg shadow-lg bg-primary sm:w-1/2">
				{children}
			</div>
		</main>
	);
};

export default RootLayout;
