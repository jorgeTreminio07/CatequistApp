import { useThemeColors } from "@/hooks/use-theme";
import { LinearGradient } from "expo-linear-gradient";
import { Text, useWindowDimensions, View } from "react-native";

const HeaderTabHomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const theme = useThemeColors();
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

      {/* <Text
        className="text-xl font-bold text-white"
        style={{
          marginLeft: width * 0.07,
          marginTop: 5,
        }}
      >
        Tu camino de fe comienza aquí ✨
      </Text> */}

      <View
        className="flex-row justify-between"
        style={{
          marginTop: 20,
          marginHorizontal: width * 0.07,
        }}
      >
        <Text className="text-lg font-geist-bold text-white">Tu Progreso</Text>

        <Text className="text-lg font-geist-bold text-white">1/5 Temas</Text>
      </View>

      <View
        className="flex-row justify-center bg-red-500 rounded-full"
        style={{
          width: width - width * 0.07 * 2,
          marginHorizontal: width * 0.07,
          height: 15,
        }}
      >
        <Text className="text-xs font-geist-bold text-white">Barprogress</Text>
      </View>
    </LinearGradient>
  );
};

export default HeaderTabHomeScreen;
