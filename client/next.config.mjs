/** @type {import('next').NextConfig} */
const nextConfig = { 
  reactStrictMode: true,
  poweredByHeader: false,
  images: { 
	unoptimized: true,
	remotePatterns: [ { 
		protocol: 'https', 
		hostname: 'youtube-clone-j94d.onrender.com', 
		port: '', 
		pathname: '/uploads/**', 
	}, ],
 },
  async rewrites() {
    return [{
      source: '/uploads/:path*',
      destination: `${process.env.SERVER_URL || 'https://youtube-clone-j94d.onrender.com'}/uploads/:path*`,
    }];
  },
};

export default nextConfig;

