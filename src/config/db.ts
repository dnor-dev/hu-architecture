import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "2506", 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== "production",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  entities: ["src/models/**/*.{ts,js}"],
  migrations: ["src/migration/**/*.{ts,js}"],
  subscribers: ["src/subscriber/**/*.{ts,js}"],
  extra: {
    max: 20,
    min: 5,
    idleTimeoutMillis: 30000,
  },
  logging: process.env.NODE_ENV !== "production",
});
