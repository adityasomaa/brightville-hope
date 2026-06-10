// Applies schema.sql + seed.sql to the Supabase project via the management API.
// Usage: SUPABASE_ACCESS_TOKEN=sbp_xxx node supabase/apply.mjs
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_REF = "oootnvqwtndgesohhpzh";
const token = process.env.SUPABASE_ACCESS_TOKEN;
if (!token) {
  console.error("Set SUPABASE_ACCESS_TOKEN first.");
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));

async function run(label, sql) {
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: sql }),
    }
  );
  const text = await res.text();
  if (!res.ok) {
    console.error(`${label} FAILED (${res.status}): ${text}`);
    process.exit(1);
  }
  console.log(`${label} OK`);
}

await run("schema", readFileSync(join(here, "schema.sql"), "utf8"));
await run("seed", readFileSync(join(here, "seed.sql"), "utf8"));
console.log("Supabase provisioning complete.");
