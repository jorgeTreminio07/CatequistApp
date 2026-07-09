import { useThemeColors } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Pressable, Text, useWindowDimensions, View } from "react-native";

import { ThemeVideoData } from "@/Infrastructure/repository/ThemeVideoRepository";

interface ThemeVideoScreenProps {
  tema: ThemeVideoData | null;
  activeColor: string;
}

const HeaderThemeVideoScreen = ({
  tema,
  activeColor,
}: ThemeVideoScreenProps) => {
  const theme = useThemeColors();
  const { width, height } = useWindowDimensions();

  if (!tema) return null;
  return (
    <LinearGradient
      colors={[theme.gradientPrimary[0], theme.gradientPrimary[1]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 2, y: 1 }}
      style={{
        height: height * 0.18,
        width,
      }}
    >
      <View
        style={{
          marginHorizontal: width * 0.06,
          marginTop: height * 0.05,
        }}
      >
        <Pressable
          style={{
            marginBottom: height * 0.01,
          }}
          className="flex-row items-center active:opacity-70"
          onPress={() => {
            router.push("/(tabs)");
          }}
        >
          <Ionicons name="chevron-back" size={26} color="white" />
          <Text className="text-2xl font-geist-bold text-white">Volver</Text>
        </Pressable>

        <View className="flex-row items-center">
          <View
            className="items-center justify-center rounded-full"
            style={{
              backgroundColor: activeColor,
              height: height * 0.07,
              width: width * 0.15,
              marginLeft: width * 0.02,
            }}
          >
            <Ionicons name={tema.icon} size={20} color="white" />
          </View>
          <View
            className="flex-1"
            style={{
              marginLeft: width * 0.05,
              height: height * 0.07,
              width: width * 0.15,
            }}
          >
            <Text className="text-sm font-geist-extra-light-italic text-white">
              Tema {tema.themeId}
            </Text>
            <Text className="text-2xl font-geist-black text-white">
              {tema.themeTittle}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default HeaderThemeVideoScreen;
