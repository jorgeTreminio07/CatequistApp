import { useThemeColors } from "@/hooks/use-theme";
import { Text, useWindowDimensions, View } from "react-native";

const ThemeVideoScreen = () => {
  const { width, height } = useWindowDimensions();
  const theme = useThemeColors();
  return (
    <View className="flex-1">
      <View className="bg-blue-500 items-center" style={{ width: width }}>
        <Text>header</Text>
      </View>
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
