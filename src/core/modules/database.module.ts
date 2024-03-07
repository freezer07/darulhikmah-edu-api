import mysql from "mysql2";
import { Pool, PoolOptions, PoolConnection, Connection, ConnectionOptions } from "mysql2/promise";

export let poolWrtier: Pool;
export let poolReader: Pool;

export const connectionLimit = +(process.env.DB_MAX_CONN || 200);

export const DBOpionType: any = {
  writer: {
    host: "DB_WRITER_HOST",
    user: "DB_WRITER_USER",
    password: "DB_WRITER_PASSWORD",
    database: "DB_WRITER_NAME",
  },
  reader: {
    host: "DB_READER_HOST",
    user: "DB_READER_USER",
    password: "DB_READER_PASSWORD",
    database: "DB_READER_NAME",
  },
};

export const initDatabase = async () => {
  const writerOption = getPoolOption("writer");
  const readerOption = getPoolOption("reader");
  poolWrtier = mysql.createPool(writerOption).promise();
  poolReader = mysql.createPool(readerOption).promise();
};

export const getPoolOption = (DBtype: string): PoolOptions => {
  const dbOption = DBOpionType[DBtype];

  const result: any = {
    connectionLimit,
  };
  for (const key in dbOption) {
    result[key] = process.env[dbOption[key]];
  }

  return result;
};

export const getConnectionFromPool = async (pool: Pool): Promise<PoolConnection> => {
  return await pool.getConnection();
};

export const getWriterConnection = async (): Promise<PoolConnection> => {
  if (!poolWrtier) {
    const writerOption = getPoolOption("writer");
    console.log(writerOption);
    poolWrtier = mysql.createPool(writerOption).promise();
  }

  return await getConnectionFromPool(poolWrtier);
};

export const getReaderConnection = async (): Promise<PoolConnection> => {
  if (!poolReader) {
    const readerOption = getPoolOption("reader");
    console.log(readerOption);
    poolReader = mysql.createPool(readerOption).promise();
  }

  return await getConnectionFromPool(poolReader);
};
