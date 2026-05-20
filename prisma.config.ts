import path from "node:path";
import { defineConfig } from "prisma/config";
import { config } from "dotenv";

config(); // Load variables from .env

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  earlyAccess: true,
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
