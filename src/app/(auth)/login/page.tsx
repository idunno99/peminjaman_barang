import FormLogin from "@/app/(auth)/components/FormLogin";

export const metadata = {
	title: "Login",
};

const LoginPage = () => {
	return (
		<div className="flex flex-col items-center justify-center h-full p-4">
			<h1 className="text-2xl font-bold">LOGIN</h1>
			<p className="text-sm">Login untuk melakukan peminjaman</p>
			<FormLogin />
		</div>
	);
};

export default LoginPage;
