import { QueryOptions } from "mysql2";
import { PoolConnection } from "mysql2/promise";
import { getReaderConnection, getWriterConnection } from "../core/modules/database.module";

export const defaultPageSize = 10;
export const defaultTimeout = 5000;

export type DBSelectResult = Array<any>;

export interface DBInsertResult {
  insertId: number;
  affectedRows: number;
}

export interface DBUpdateResult {
  changedRows: number;
  affectedRows: number;
}

export interface DBDeleteResult {
  changedRows: number;
  affectedRows: number;
}

export interface DBSelectResultWithPaging {
  result: DBSelectResult;
  hasNext: boolean;
}

export interface PagingOption {
  page: number;
  pageSize: number;
}

export interface queryOption {
  sql: string;
  timeout: number;
}

export const beginTransaction = async (preConn: PoolConnection, readCommit?: boolean) => {
  let connection = preConn ? preConn : await getWriterConnection();

  try {
    if (readCommit) {
      await connection.query(`START TRANSACTION`);
      await connection.query(`SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED`);
    } else {
      await connection.beginTransaction();
    }
  } catch (error) {
    connection.destroy();
    connection = await getWriterConnection();

    if (readCommit) {
      await connection.query(`START TRANSACTION`);
      await connection.query(`SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED`);
    } else {
      await connection.beginTransaction();
    }
  }
};

export const query = async (option: QueryOptions, preConn?: PoolConnection): Promise<any> => {
  let connection = preConn ? preConn : await getReaderConnection();
  try {
    return connection.query(option);
  } catch (error) {
    connection.destroy();
    connection = await getReaderConnection();

    return connection.query(option);
  }
};

export const execute = async (option: QueryOptions, preConn?: PoolConnection): Promise<any> => {
  let connection = preConn ? preConn : await getWriterConnection();
  try {
    return connection.query(option);
  } catch (error) {
    connection.destroy();
    connection = await getWriterConnection();

    return connection.query(option);
  }
};

export const commit = async (preConn?: PoolConnection): Promise<void> => {
  const connection = preConn ? preConn : await getWriterConnection();

  await connection.commit();
};

export const rollback = async (preConn?: PoolConnection): Promise<void> => {
  const connection = preConn ? preConn : await getWriterConnection();

  await connection.rollback();
};

export const getLimitPaging = (pagingOption?: PagingOption): string => {
  const page = Number(pagingOption?.page || 1);
  const pageSize = Number(pagingOption?.pageSize || defaultPageSize);
  const startPage = page - 1;
  const endPage = page * pageSize;

  return `LIMIT ${[startPage, endPage].join(", ")}`;
};

export const select = async (option: QueryOptions, preConn?: PoolConnection): Promise<DBSelectResult> => {
  const result = await query(option, preConn);
  return result[0];
};

export const selectWithPaging = async (
  option: QueryOptions,
  pageOption?: PagingOption,
  preConn?: PoolConnection
): Promise<DBSelectResultWithPaging> => {
  // pageOption.pageSize += 1;
  pageOption = getPagingOption(pageOption);
  option.sql += getLimitPaging(pageOption);

  const queryResult = await query(option, preConn);
  const result = {
    result: queryResult[0],
    hasNext: queryResult[0]?.length > pageOption?.pageSize,
  };

  return result;
};

export const executeSelect = async (option: QueryOptions, preConn?: PoolConnection): Promise<DBSelectResult> => {
  const result = await execute(option, preConn);
  return result[0];
};

export const executeInsert = async (option: QueryOptions, preConn?: PoolConnection): Promise<DBInsertResult> => {
  const result = await execute(option, preConn);
  return result[0];
};

export const executeUpdate = async (option: QueryOptions, preConn?: PoolConnection): Promise<DBUpdateResult> => {
  const result = await execute(option, preConn);
  return result[0];
};

export const executeDelete = async (option: QueryOptions, preConn?: PoolConnection): Promise<DBDeleteResult> => {
  const result = await execute(option, preConn);
  return result[0];
};

export const getQuery = (sql: string, timeout?: number) => {
  return {
    sql: sql,
    timeout: timeout || defaultTimeout,
  };
};

export const getInsertQuery = (sql: string, values: any[], timeout?: number) => {
  return {
    sql: sql,
    values: [values],
    timeout: timeout || defaultTimeout,
  };
};

export const getPagingOption = (pageOption?: PagingOption): PagingOption => {
  return {
    page: pageOption?.page || 1,
    pageSize: pageOption?.pageSize || 10,
  };
};

export default {
  getReaderConnection,
  getWriterConnection,
  beginTransaction,
  query,
  execute,
  commit,
  rollback,
  getLimitPaging,
  select,
  selectWithPaging,
  executeSelect,
  executeInsert,
  executeUpdate,
  executeDelete,
  getQuery,
  getInsertQuery,
};
