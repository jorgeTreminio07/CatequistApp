import { useThemeColors } from "@/hooks/use-theme";
import { ThemeVideoData } from "@/Infrastructure/repository/ThemeVideoRepository";
import { router } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import ThemeCard from "./ThemeCard";

interface ContentTabsHomeScreenProps {
  listaTemas: ThemeVideoData[];
  cargando: boolean;
}

const ContentTabsHomeScreen = ({
  listaTemas,
  cargando,
}: ContentTabsHomeScreenProps) => {
  const { width, height } = useWindowDimensions();
  const theme = useThemeColors();
  const headerHeight = height * 0.28;

  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={{ height: headerHeight }} />
      <View
        style={{
          minHeight: height,
          width,
          backgroundColor: theme.background,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingTop: 25,
          paddingBottom: 100,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            marginTop: 10,
            marginHorizontal: width * 0.07,
          }}
        >
          {cargando ? (
            <ActivityIndicator
              size="large"
              color={theme.primary || "#000"}
              style={{ marginTop: 20 }}
            />
          ) : (
            listaTemas.map((tema) => (
              <ThemeCard
                key={tema.themeId}
                tittle={tema.themeTittle}
                subTittle={tema.subTittle}
                icon={tema.icon}
                status={tema.status}
                color={tema.color}
                position={tema.position}
                onPress={() => {
                  if (tema.status !== "blocked") {
                    router.push({
                      pathname: "/theme/[id]",
                      params: { id: tema.themeId },
                    });
                  } else {
                    console.log(`El tema ${tema.themeId} está bloqueado.`);
                  }
                }}
              />
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ContentTabsHomeScreen;
