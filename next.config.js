module.exports = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://app-market-backend.herokuapp.com/:path*"
            }
        ];
    }
};
