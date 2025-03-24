/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
 images: {
        remotePatterns: [
            { hostname: 'justopjewelry.com' },
            { hostname: 'api.spicezgold.com' },
            { hostname: 'dreamskinnepal.com' },
            { hostname: 'localhost' },
            { hostname: '192.168.10.84' },
        ],
    }
};

export default nextConfig;
