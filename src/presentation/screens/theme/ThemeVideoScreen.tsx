import { useThemeColors } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Pressable, Text, useWindowDimensions, View } from "react-native";

const ThemeVideoScreen = () => {
  const { width, height } = useWindowDimensions();
  const theme = useThemeColors();

  return (
    // REPARACIÓN: El contenedor principal DEBE tener fondo oscuro explícito
    <View className="flex-1" style={{ backgroundColor: "#121212" }}>
      <LinearGradient
        // REPARACIÓN: Quitamos 'flex-1' de aquí para que respete el alto estricto del 18% sin colapsar en la animación
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
            className="flex-row items-center active:opacity-70" // Feedback visual limpio
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="chevron-back" size={26} color="white" />
            <Text className="text-3xl font-bold text-white">Volver</Text>
          </Pressable>

          <View className="flex-row items-center">
            <View
              className="items-center justify-center rounded-3xl"
              style={{
                backgroundColor: theme.secondary,
                height: height * 0.07,
                width: width * 0.15,
                marginLeft: width * 0.02,
              }}
            >
              <Ionicons name="accessibility-outline" size={20} color="white" />
            </View>
            <View
              className="flex-1 justify-between"
              style={{
                marginLeft: width * 0.05,
                height: height * 0.07,
                width: width * 0.15,
              }}
            >
              <Text className="text-sm font-bold text-white">
                numero de tema
              </Text>
              <Text className="text-3xl font-geist-bold text-white">
                quien es DIos?
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View className="bg-red-500 items-center" style={{ width: width }}>
        <Text>video</Text>
      </View>
      <View className="bg-purple-500 items-center" style={{ width: width }}>
        <Text>content</Text>
      </View>
      <View className="bg-blue-500 items-center" style={{ width: width }}>
        <Text>button</Text>
      </View>
    </View>
  );
};

export default ThemeVideoScreen;
