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

  console.log("Configurando tablas de forma persistente (sin borrar datos)...");

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    
    CREATE TABLE IF NOT EXISTS catecism (
      catecismId INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS themes (
      themeId INTEGER PRIMARY KEY NOT NULL,
      catecismId INTEGER NOT NULL,
      themebycatecismId INTEGER NOT NULL,
      themeTittle TEXT NOT NULL,
      subTittle TEXT NOT NULL,
      icon TEXT NOT NULL,
      status TEXT NOT NULL,
      position TEXT NOT NULL,
      videoIdProp TEXT NOT NULL,
      ContentTittle TEXT NOT NULL,
      content TEXT NOT NULL,
      color TEXT NOT NULL,
      FOREIGN KEY (catecismId) REFERENCES catecism(catecismId)
    );
  `);

  const catecismCheck = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM catecism;",
  );

  if (catecismCheck && catecismCheck.count === 0) {
    console.log("Insertando registros iniciales en la tabla catecism...");
    await db.runAsync(
      `INSERT INTO catecism (catecismId, name) VALUES (1, 'Comunión'), (2, 'Confirmación');`,
    );
  }

  const result = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM themes;",
  );

  if (result && result.count === 0) {
    console.log("Base de datos vacía. Insertando mocks con orden local...");
    for (const theme of MOCK_THEMES) {
      await db.runAsync(
        `INSERT INTO themes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          theme.themeId,
          theme.catecismId,
          theme.themebycatecismId,
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
    console.log("¡Mocks cargados exitosamente por primera vez!");
  } else {
    console.log(
      `Base de datos detectada con ${result?.count} temas persistidos.`,
    );
  }

  return dbInstance;
}
