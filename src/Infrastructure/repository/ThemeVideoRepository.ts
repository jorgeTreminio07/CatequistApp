import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

export type ThemeStatus = "start" | "blocked" | "done";
export type ThemeVariant =
  "dios" | "jesus" | "biblia" | "sacramentos" | "oracion";
export type ThemePosition = "left" | "center" | "right";

export interface ThemeVideoData {
  themeId: number;
  catecismId: number;
  themebycatecismId: number;
  themeTittle: string;
  subTittle: string;
  icon: keyof typeof Ionicons.glyphMap;
  status: ThemeStatus;
  position: ThemePosition;
  videoIdProp: string;
  ContentTittle: string;
  content: string;
  color: ThemeVariant;
}

export class ThemeVideoRepository {
  private db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  async setStatusDone(
    themebycatecismId: number,
    catecismId: number,
  ): Promise<void> {
    try {
      const query =
        "UPDATE themes SET status = 'done' WHERE themebycatecismId = ? AND catecismId = ?;";
      await this.db.runAsync(query, [themebycatecismId, catecismId]);
      const queryViewNextTheme =
        "SELECT status FROM themes WHERE themebycatecismId = ? AND catecismId = ?;";
      const result = await this.db.getFirstAsync<{ status: string }>(
        queryViewNextTheme,
        [themebycatecismId + 1, catecismId],
      );
      if (result?.status === "blocked") {
        const queryTwo =
          "UPDATE themes SET status = 'start' WHERE themebycatecismId = ? AND catecismId = ?;";
        await this.db.runAsync(queryTwo, [themebycatecismId + 1, catecismId]);
      } else {
        console.log("El siguiente tema ya está desbloqueado o no existe.");
      }
    } catch (error) {
      console.error("Error al actualizar el estado del tema:", error);
      throw error;
    }
  }

  async countThemesDone(idCatecism: number): Promise<number> {
    try {
      const query =
        "SELECT COUNT(*) as count FROM themes where status = 'done' and catecismId = ?;";
      const result = await this.db.getFirstAsync<{ count: number }>(query, [
        idCatecism,
      ]);
      if (!result) throw new Error("No se encontraron temas.");
      return result.count;
    } catch (error) {
      console.error("Error al contar los temas:", error);
      throw error;
    }
  }

  async getAllThemes(idCatecism: number): Promise<ThemeVideoData[]> {
    try {
      const query = "SELECT * FROM themes WHERE catecismId = ?;";
      return await this.db.getAllAsync<ThemeVideoData>(query, [idCatecism]);
    } catch (error) {
      console.error("Error al obtener todos los temas:", error);
      throw error;
    }
  }

  async getThemeById(
    themeId: number,
    idCatecism: number,
  ): Promise<ThemeVideoData | null> {
    try {
      const query =
        "SELECT * FROM themes WHERE themebycatecismId = ? AND catecismId = ?;";
      return await this.db.getFirstAsync<ThemeVideoData>(query, [
        themeId,
        idCatecism,
      ]);
    } catch (error) {
      console.error(`Error al obtener el tema con ID ${themeId}:`, error);
      throw error;
    }
  }

  async saveTheme(theme: ThemeVideoData): Promise<void> {
    const query = `
      INSERT INTO themes (
        themeId, themeTittle, subTittle, icon, status, 
        position, videoIdProp, ContentTittle, content, color
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(themeId) DO UPDATE SET
        themeTittle = excluded.themeTittle,
        subTittle = excluded.subTittle,
        icon = excluded.icon,
        status = excluded.status,
        position = excluded.position,
        videoIdProp = excluded.videoIdProp,
        ContentTittle = excluded.ContentTittle,
        content = excluded.content,
        color = excluded.color;
    `;

    await this.db.runAsync(query, [
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
    ]);
  }
}
