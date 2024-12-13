/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          pathname: '/**', // Esto permite todos los paths en Cloudinary
        },
      ],
    }
  };

export default nextConfig;
