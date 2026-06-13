import { useThemeColors } from "@/hooks/use-theme";
import { useWindowDimensions, View } from "react-native";
import ContentTabsHomeScreen from "./components/TabsHomeScreen/ContentTabsHomeScreen";
import HeaderTabHomeScreen from "./components/TabsHomeScreen/HeaderTabHomeScreen";

const TabsHomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const theme = useThemeColors();

  const headerHeight = height * 0.28;

  return (
    <View className="flex-1">
      <HeaderTabHomeScreen />
      <ContentTabsHomeScreen />
    </View>
  );
};

export default TabsHomeScreen;
