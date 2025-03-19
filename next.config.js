/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		ppr: 'incremental', // Partial Prerendering
	},
	//output: "standalone", //this is only for next.js on Azure Static Web Apps...
	reactStrictMode: true,
	// swcMinify: true, //deprecated
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.aglty.io',
			},
			{
				protocol: 'https',
				hostname: '*.agilitycms.com',
			}
		],
	},
	async headers() {
		return [
		  {
			source: "/",
			headers: [
			  { key: "Cache-Control", value: "no-store" },
			  { key: "Set-Cookie", value: "SameSite=Lax; Secure" },
			],
		  },
		];
	}
}

module.exports = nextConfig
