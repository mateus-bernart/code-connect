/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // domains: [
            //     'raw.githubusercontent.com'
            // ],
            {
              protocol: 'https',
              hostname: 'raw.githubusercontent.com',
              port: '',
              pathname: '**',
            },
          ],
    }
};

export default nextConfig;
