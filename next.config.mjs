/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
 images: {
        remotePatterns: [
            { hostname: 'justopjewelry.com' },
            { hostname: 'api.spicezgold.com' },
            { hostname: 'dreamskinnepal.com' }
        ],
    }
};

export default nextConfig;
