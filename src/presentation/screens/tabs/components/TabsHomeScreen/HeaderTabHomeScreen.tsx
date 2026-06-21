import { useThemeColors } from "@/hooks/use-theme";
import { LinearGradient } from "expo-linear-gradient";
import { Text, useWindowDimensions, View } from "react-native";

interface HeaderTabHomeScreenProps {
  countThemes: number;
  countThemesDone: number;
}

const HeaderTabHomeScreen = ({
  countThemes,
  countThemesDone,
}: HeaderTabHomeScreenProps) => {
  const { width, height } = useWindowDimensions();
  const theme = useThemeColors();

  const total = countThemes || 1;
  const porcentaje = Math.min((countThemesDone / total) * 100, 100);

  return (
    <LinearGradient
      colors={[theme.gradientPrimary[0], theme.gradientPrimary[1]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Text
        className="text-xl font-geist-bold text-white"
        style={{
          marginLeft: width * 0.07,
          marginTop: height * 0.07,
        }}
      >
        Bienvenid@!
      </Text>

      <Text
        className="text-4xl font-geist-black text-white"
        style={{
          marginLeft: width * 0.07,
          marginRight: width * 0.07,
          marginTop: 5,
        }}
      >
        CatequistApp
      </Text>
      <View
        className="flex-row justify-between"
        style={{
          marginTop: 20,
          marginHorizontal: width * 0.07,
        }}
      >
        <Text className="text-lg font-geist-bold text-white">Tu Progreso</Text>

        <Text className="text-lg font-geist-bold text-white">
          {countThemesDone}/{countThemes} Temas
        </Text>
      </View>

      <View
        className="rounded-full overflow-hidden"
        style={{
          width: width - width * 0.07 * 2,
          marginHorizontal: width * 0.07,
          marginTop: 10,
          height: 10,
          backgroundColor: "rgba(255, 255, 255, 0.25)",
        }}
      >
        <View
          className="h-full rounded-full"
          style={{
            width: `${porcentaje}%`,
            backgroundColor: theme.accent || "#f5c842",
          }}
        />
      </View>
    </LinearGradient>
  );
};

export default HeaderTabHomeScreen;
