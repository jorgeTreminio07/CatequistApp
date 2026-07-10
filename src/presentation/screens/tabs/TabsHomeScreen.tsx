import { useThemeColors } from "@/hooks/use-theme";
import { initializeDatabase } from "@/Infrastructure/database";
import {
  ThemeVideoData,
  ThemeVideoRepository,
} from "@/Infrastructure/repository/ThemeVideoRepository";
import { useEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import ContentTabsHomeScreen from "./components/TabsHomeScreen/ContentTabsHomeScreen";
import HeaderTabHomeScreen from "./components/TabsHomeScreen/HeaderTabHomeScreen";
import { useCategoryStore } from "./store/use-category-store";

const TabsHomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const theme = useThemeColors();

  const headerHeight = height * 0.28;

  const [listaTemas, setListaTemas] = useState<ThemeVideoData[]>([]);
  const [countThemesDone, setCountThemesDone] = useState<number>(0);
  const [cargando, setCargando] = useState(true);
  const activeCategory = useCategoryStore((state) => state.activeCategory);
  var idCatecism = 1;

  useEffect(() => {
    let isMounted = true;

    async function cargarDatosPantalla() {
      try {
        const db = await initializeDatabase();
        const repo = new ThemeVideoRepository(db);

        console.log("--- Cargando Datos desde SQLite ---");

        if (activeCategory === "Comunion") {
          idCatecism = 1;
        } else if (activeCategory === "Confirmacion") {
          idCatecism = 2;
          console.log("Catecismo: Confirmacion");
        }

        const [temasFromDB, totalCompletados] = await Promise.all([
          repo.getAllThemes(idCatecism),
          repo.countThemesDone(idCatecism),
        ]);

        if (isMounted) {
          setListaTemas(temasFromDB);
          setCountThemesDone(totalCompletados);

          console.log(
            `[SQLite] Totales: ${temasFromDB.length} | Completados (done): ${totalCompletados}`,
          );
          console.log("-----------------------------------");
        }
      } catch (error) {
        console.error("Error al mapear los temas de la DB:", error);
      } finally {
        if (isMounted) {
          setCargando(false);
        }
      }
    }

    cargarDatosPantalla();

    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  return (
    <View className="flex-1">
      <HeaderTabHomeScreen
        countThemes={listaTemas.length}
        countThemesDone={countThemesDone}
      />
      <ContentTabsHomeScreen listaTemas={listaTemas} cargando={cargando} />
    </View>
  );
};

export default TabsHomeScreen;
