import { useThemeColors } from "@/hooks/use-theme";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";

const ContentTabsHomeScreen = () => {
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
  );
};

export default ContentTabsHomeScreen;
