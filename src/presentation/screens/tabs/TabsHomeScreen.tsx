import { useThemeColors } from "@/hooks/use-theme";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";

const TabsHomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const theme = useThemeColors();
  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: theme.gradientPrimary[0] }}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={[theme.gradientPrimary[0], theme.gradientPrimary[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={{
          //height: height * 0.5,
          width,
        }}
      >
        <View className="flex-1" style={{ backgroundColor: "transparent" }}>
          <Text
            className="text-xl font-bold text-white"
            style={{ marginLeft: width * 0.07, marginTop: height * 0.07 }}
          >
            Bienvenid@!
          </Text>
          <Text
            className="text-6xl font-bold text-white"
            style={{
              marginLeft: width * 0.07,
              marginTop: 5,
            }}
          >
            CatequistApp
          </Text>

          <Text
            className="text-xl font-bold text-white"
            style={{
              marginLeft: width * 0.07,
              marginTop: 5,
            }}
          >
            Tu camino de fe comienza aquí ✨
          </Text>
          <View
            className="flex-row justify-between"
            style={{
              marginTop: 10,
              marginHorizontal: width * 0.07,
            }}
          >
            <Text className="text-lg font-bold text-white">Tu Progreso</Text>

            <Text className="text-lg font-bold text-white">1/5 Temas</Text>
          </View>
          <View
            className="flex-row justify-center bg-red-500 rounded-full"
            style={{
              width: width - width * 0.07 * 2,
              marginHorizontal: width * 0.07,
              height: 15,
            }}
          >
            <Text className="text-xs font-bold text-white">Barprogress</Text>
          </View>
          <View
            className="items-center justify-center mt-5"
            style={{
              minHeight: height - height * 0.26,
              paddingTop: 20,
              paddingBottom: 90,
              width: width,
              backgroundColor: theme.secondary,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              overflow: "hidden",
            }}
          >
            <Text className="text-xl font-bold text-black ">
              Catequesis themes
            </Text>
            <Text className="text-4xl">4xl</Text>
            <Text className="text-5xl">5xl</Text>
            <Text className="text-6xl">6xl</Text>
            <Text className="text-7xl">7xl</Text>
            <Text className="text-8xl">8xl</Text>
            <Text className="text-9xl">9xl</Text>
            <Text className="text-4xl">4xl</Text>
            <Text className="text-5xl">5xl</Text>
            <Text className="text-6xl">6xl</Text>
            <Text className="text-7xl">7xl</Text>
            <Text className="text-8xl">8xl</Text>
            <Text className="text-9xl">9xl</Text>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default TabsHomeScreen;
