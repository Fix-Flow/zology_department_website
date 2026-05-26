import path from "node:path";
import { defineConfig } from "prisma/config";
import { config } from "dotenv";

config(); // Load variables from .env

const isCli = process.argv.some((arg) => arg.includes("prisma"));
const dbUrl = (isCli && process.env.DIRECT_DATABASE_URL)
  ? process.env.DIRECT_DATABASE_URL
  : process.env.DATABASE_URL;

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: dbUrl,
  },
});
