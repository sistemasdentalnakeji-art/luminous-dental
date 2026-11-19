// node harness.mjs : turns Estilo-B4.dc.html into a plain page that runs its logic (the local viewer cannot run the DC runtime), for screenshots.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { HERE } from "./bundle.mjs";
const src = readFileSync(join(HERE, "..", "..", "project", "Estilo-B4.dc.html"), "utf8");
const helmet = /<helmet>([\s\S]*?)<\/helmet>/.exec(src)[1];
const body = /<\/helmet>([\s\S]*?)<\/x-dc>/.exec(src)[1];
const logic = /data-dc-script[^>]*>([\s\S]*?)<\/script>/.exec(src)[1];
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>harness B4</title>${helmet}</head><body>${body.replaceAll("/_blob/", "../../_blob/")}<script>class DCLogic{constructor(){this.props={};}}\n${logic}\nconst c=new Component();c.componentDidMount();</script></body></html>`;
writeFileSync(join(HERE, "harness-b4.html"), html);
console.log("wrote harness-b4.html");
