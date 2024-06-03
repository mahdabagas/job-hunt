/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'schtqzykthzcrpqvjket.supabase.co',
          },
        ],
      },
}

module.exports = nextConfig
