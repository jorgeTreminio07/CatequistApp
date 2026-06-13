import { useThemeColors } from "@/hooks/use-theme";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";

const TabsHomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const theme = useThemeColors();

  const headerHeight = height * 0.28;

  return (
    <View className="flex-1">
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
          className="text-xl font-bold text-white"
          style={{
            marginLeft: width * 0.07,
            marginTop: height * 0.07,
          }}
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
      </LinearGradient>

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
            backgroundColor: theme.secondary,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 25,
            paddingBottom: 100,
            overflow: "hidden",
          }}
        >
          <View className="items-center">
            <Text className="text-xl font-bold text-black">
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
      </ScrollView>
    </View>
  );
};

export default TabsHomeScreen;
