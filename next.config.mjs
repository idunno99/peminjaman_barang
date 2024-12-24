/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "uho0hdjvrfffe0xr.public.blob.vercel-storage.com",
			},
		],
	},
};

export default nextConfig;
