/**
 * @type {import('@remix-run/dev').AppConfig}
 */

/**
 * 
 */
const isLocalBuildOrDevelopment = process.env.BUILD_ENV === "local" || process.env.NODE_ENV === "development";

const config = {
  serverBuildTarget: isLocalBuildOrDevelopment ? undefined : "vercel",
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: isLocalBuildOrDevelopment ? undefined : "./server.js",
  ignoredRouteFiles: [".*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "api/index.js",
  // publicPath: "/build/",
  // devServerPort: 8002
};

if (process.env.DEBUG) {
  console.log({ config });
}

module.exports = config;
