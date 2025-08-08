// Import will be handled by build process
let tokenList;
try {
  tokenList = require("../build/uniswap-default.tokenlist.json");
} catch (e) {
  // Fallback for CI/CD - the build will inject the actual content
  tokenList = { name: "Uniswap Default List", tokens: [] };
}

module.exports = {
  async fetch(request) {
    const url = new URL(request.url);

    // Serve token list at root or /uniswap-default.tokenlist.json
    if (url.pathname === "/" || url.pathname === "/uniswap-default.tokenlist.json") {
      return new Response(JSON.stringify(tokenList, null, 2), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    // Return 404 for other paths
    return new Response("Not Found", { status: 404 });
  },
};
