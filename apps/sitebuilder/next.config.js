// @ts-check
/*
 * Next.js configuration for the Ledge sitebuilder.
 *
 * FIXED STACK — do not change these two lines:
 *   - output: 'export'          → static HTML export (no SSR). Deployed to Cloudflare Pages.
 *   - images.unoptimized: true  → static export disables Next's image optimizer.
 *
 * We also validate site.config.json here so a malformed config fails `next build`
 * loudly (the Cloudflare build command is plain `next build`, so the validator has
 * to run inside the Next build rather than in an npm prebuild hook).
 */
const { validateConfig } = require('./scripts/validate-config.cjs');
const siteConfig = require('./site.config.json');

// Teeth: throws on a structurally invalid config, which aborts the build.
validateConfig(siteConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Cloudflare Pages serves each route as a directory with an index.html.
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
