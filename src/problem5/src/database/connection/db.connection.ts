import { logger } from "../../utils/logger/logger";
import { DataSource } from "typeorm";
import { env } from "../../env";

export const dataSource = new DataSource({
  type: "postgres",
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.name,
  entities: [__dirname + "/../../**/*.model.{ts,js}"],
  migrations: [__dirname + "/../migrations/*.{ts,js}"],
  migrationsTransactionMode: "each",
  dropSchema: false,
  logging: false,
  synchronize: false,
});

export const connectDB = async () => {
  dataSource
    .initialize()
    .then(() => {
      logger.info("DB connected successfully");
    })
    .catch((err) => {

      logger.error("Error during Data Source initialization:", err);
    });
};
