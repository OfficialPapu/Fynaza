/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
 images: {
        remotePatterns: [
            { hostname: 'justopjewelry.com' },
            { hostname: 'api.spicezgold.com' },
            { hostname: 'dreamskinnepal.com' },
            { hostname: 'localhost' },
        ],
    }
};

export default nextConfig;
