/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['links.papareact.com',
            'platform-lookaside.fsbx.com', 'firebasestorage.googleapis.com'
        ],
    }
}