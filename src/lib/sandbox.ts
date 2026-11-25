export interface SandboxMessage {
  __cq: true;
  runId: number;
  type: "log" | "warn" | "error" | "test";
  data: string | boolean;
}

/** Prevent user code from terminating our injected <script> blocks. */
const safe = (code: string) => code.replace(/<\/(script)/gi, "<\\/$1");

/**
 * Builds the srcDoc for the sandboxed iframe.
 * The iframe uses `sandbox="allow-scripts"` WITHOUT allow-same-origin, so user code runs in an opaque origin
 * and cannot reach the host app, its storage or cookies. No eval is used in the main application.
 */
export function buildSandboxDoc(opts: { html: string; css: string; js: string; runId: number; test?: string }): string {
  const { html, css, js, runId, test } = opts;
  const bridge = `
(function () {
  var runId = ${runId};
  function send(type, data) { parent.postMessage({ __cq: true, runId: runId, type: type, data: data }, "*"); }
  function fmt(v) {
    if (typeof v === "string") return v;
    try { return typeof v === "object" ? JSON.stringify(v) : String(v); } catch (e) { return String(v); }
  }
  ["log", "warn", "error", "info"].forEach(function (k) {
    var orig = console[k];
    console[k] = function () {
      send(k === "info" ? "log" : k, Array.prototype.slice.call(arguments).map(fmt).join(" "));
      if (orig) orig.apply(console, arguments);
    };
  });
  window.addEventListener("error", function (e) { send("error", (e.message || "Error") + (e.lineno ? " (line " + e.lineno + ")" : "")); });
  window.addEventListener("unhandledrejection", function (e) { send("error", String(e.reason)); });
})();`;
  const testScript = test
    ? `<script>
window.addEventListener("load", function () {
  var ok = false;
  try { ok = !!(function () { ${safe(test)} })(); } catch (e) { ok = false; }
  parent.postMessage({ __cq: true, runId: ${runId}, type: "test", data: ok }, "*");
});
</script>`
    : "";
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>body{font-family:system-ui,-apple-system,sans-serif;margin:16px;color:#111}</style>
<style>${safe(css)}</style>
<script>${bridge}</script>
</head>
<body>
${html}
<script>${safe(js)}</script>
${testScript}
</body>
</html>`;
}
