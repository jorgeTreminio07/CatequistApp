import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

export type ThemeStatus = "start" | "blocked" | "done";
export type ThemeVariant =
  | "dios"
  | "jesus"
  | "biblia"
  | "sacramentos"
  | "oracion";
export type ThemePosition = "left" | "center" | "right";

export interface ThemeVideoData {
  themeId: number;
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

  async setStatusDone(themeId: number): Promise<void> {
    try {
      const query = "UPDATE themes SET status = 'done' WHERE themeId = ?;";
      await this.db.runAsync(query, [themeId]);
      const queryViewNextTheme = "SELECT status FROM themes WHERE themeId = ?;";
      const result = await this.db.getFirstAsync<{ status: string }>(
        queryViewNextTheme,
        [themeId + 1],
      );
      if (result?.status === "blocked") {
        const queryTwo =
          "UPDATE themes SET status = 'start' WHERE themeId = ?;";
        await this.db.runAsync(queryTwo, [themeId + 1]);
      } else {
        console.log("El siguiente tema ya está desbloqueado o no existe.");
      }
    } catch (error) {
      console.error("Error al actualizar el estado del tema:", error);
      throw error;
    }
  }

  async countThemesDone(): Promise<number> {
    try {
      const query =
        "SELECT COUNT(*) as count FROM themes where status = 'done';";
      const result = await this.db.getFirstAsync<{ count: number }>(query);
      if (!result) throw new Error("No se encontraron temas.");
      return result.count;
    } catch (error) {
      console.error("Error al contar los temas:", error);
      throw error;
    }
  }

  async getAllThemes(): Promise<ThemeVideoData[]> {
    try {
      const query = "SELECT * FROM themes;";
      return await this.db.getAllAsync<ThemeVideoData>(query);
    } catch (error) {
      console.error("Error al obtener todos los temas:", error);
      throw error;
    }
  }

  async getThemeById(themeId: number): Promise<ThemeVideoData | null> {
    try {
      const query = "SELECT * FROM themes WHERE themeId = ?;";
      return await this.db.getFirstAsync<ThemeVideoData>(query, [themeId]);
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
