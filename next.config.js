/** @type {import('next').NextConfig} */

const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const nextConfig = {
  images: {
    domains: ["api.dicebear.com", "xsgames.co"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
