// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "kairos-v2-fe",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const isProduction = $app.stage === "production";

    // Create Next.js app with Cloudflare domain for production
    new sst.aws.Nextjs("KairosWeb", {
      path: ".",
      domain: isProduction
        ? {
            name: "kairos-2.it-t.xyz",
            dns: sst.cloudflare.dns(),
          }
        : undefined,
      // Specify AWS regions
      regions: ["us-east-1"],
    });
  },
});
