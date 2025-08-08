const tokenList = require("../build/uniswap-default.tokenlist.json");

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
