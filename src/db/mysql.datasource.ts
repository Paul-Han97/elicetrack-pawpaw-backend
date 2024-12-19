import 'dotenv/config';
import { MYSQL_MIGRATION_PATH } from 'src/common/constants';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_MYSQL_HOST,
  username: process.env.DATABASE_MYSQL_USERNAME,
  password: process.env.DATABASE_MYSQL_PASSWORD,
  database: process.env.DATABASE_MYSQL_NAME,
  port: Number(process.env.DATABASE_MYSQL_PORT),
  entities: [],
  migrations: [MYSQL_MIGRATION_PATH],
  migrationsTableName: 'migrations',
  synchronize: false,
  logger: 'file',
  logging: true,
});
