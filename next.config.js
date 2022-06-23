module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/person/:id",
        destination: "https://billions-api.nomadcoders.workers.dev/person/:id",
      },
    ];
  },
};
