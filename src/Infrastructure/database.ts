import * as SQLite from "expo-sqlite";
import { MOCK_THEMES } from "./mockThemes";

const DATABASE_NAME = "app_database_v3.db";

let dbInstance: SQLite.SQLiteDatabase | null = null;

export async function initializeDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (dbInstance) {
    return dbInstance;
  }

  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  dbInstance = db;

  console.log("Inicializando tablas por primera vez en esta sesión...");

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS themes (
      themeId INTEGER PRIMARY KEY NOT NULL,
      themeTittle TEXT NOT NULL,
      subTittle TEXT NOT NULL,
      icon TEXT NOT NULL,
      status TEXT NOT NULL,
      position TEXT NOT NULL,
      videoIdProp TEXT NOT NULL,
      ContentTittle TEXT NOT NULL,
      content TEXT NOT NULL,
      color TEXT NOT NULL
    );
  `);

  const result = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM themes;",
  );

  if (result && result.count === 0) {
    console.log("Base de datos vacía. Insertando mocks...");
    for (const theme of MOCK_THEMES) {
      await db.runAsync(
        `INSERT INTO themes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          theme.themeId,
          theme.themeTittle,
          theme.subTittle,
          theme.icon,
          theme.status,
          theme.position,
          theme.videoIdProp,
          theme.ContentTittle,
          theme.content,
          theme.color,
        ],
      );
    }
    console.log("¡Mocks cargados!");
  }

  return dbInstance;
}
