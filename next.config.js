/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "assets.ellosgroup.com",
      "img.icons8.com",
      "x.klarnacdn.net",
      "images.unsplash.com",
    ],
  },
};

const intercept = require("intercept-stdout");
intercept((text) => (text.includes("Duplicate atom key") ? "" : text)); // ignores Recoil atom key warnings
