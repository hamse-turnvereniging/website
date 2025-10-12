import { promises as fs } from "node:fs";
import { resolve, dirname } from "node:path";
import Handlebars from "handlebars";
import glob from "fast-glob";

const SRC = "server/assets/templates";

const files = await glob("**/*.hbs", { cwd: SRC });
for (const f of files) {
  const source = await fs.readFile(resolve(SRC, f), "utf8");
  const spec = Handlebars.precompile(source);
  const code = `import Handlebars from 'handlebars/runtime.js';
export default Handlebars.template(${spec});
`;
  const outPath = resolve(SRC, f.replace(/\.hbs$/, ".js"));
  await fs.mkdir(dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, code, "utf8");
}
