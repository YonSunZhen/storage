import { storage_db as db } from '../storage-db';
import { storage_logger as logger } from '@storage-logger';
import { FolderDB } from './folder-types';
import { DaoType } from '../dao-types';
import { DataOptions, dbHelper } from '../utils';

const TABLE_NAME = 'folder';

async function ensure() {
  if (!await db.schema.hasTable(TABLE_NAME)) {
    logger.info(`create table '${TABLE_NAME}' now...`);
    await db.schema.createTable(TABLE_NAME, (t) => {
      t.charset('utf8mb4');
      t.increments('folderId').primary().notNullable().comment('自增id');
      t.string('folderName', 50).defaultTo(null).comment('文件夹名');
      t.integer('folderType', 10).defaultTo(null).comment('文件夹类型');
      t.dateTime('folderCreateAt').defaultTo(null).comment('创建时间');
      t.dateTime('folderUpdateAt').defaultTo(null).comment('更新时间');
    }).catch((err) => logger.error(err));
  }
}

async function insert(options: FolderDB): Promise<number> {
  const _options = DataOptions(options);
  const res: number = await db.table(TABLE_NAME).insert(_options);
  return res;
}


export const folder_dao = {
  ensure,
  insert
};