module.exports = {
  "/api": {
    target: "http://localhost:3000",
    secure: false,
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ""),
  },
};
