import { useAnimation } from "@/hooks/use-animation";
import { useThemeColors } from "@/hooks/use-theme";
import { router, useLocalSearchParams } from "expo-router";
import {
  useWindowDimensions,
  View
} from "react-native";
import ButtonFormResultScreen from "./components/FormResultScreen/ButtonFormResultScreen";
import ContentFormResultScreen from "./components/FormResultScreen/ContentFormResultScreen";
import HeaderFormResultScreen from "./components/FormResultScreen/HeaderFormResultScreen";
const FormResultScreen = () => {
  const { id, correctAnswers } = useLocalSearchParams();
  if (!id || !correctAnswers) return null;
  const correctAnswersCount = Number(correctAnswers);

  const { scaleValue, onPressIn, onPressOut } = useAnimation();
  const theme = useThemeColors();
  const { width, height } = useWindowDimensions();

  const handleButtonPress = () => {
    if (correctAnswersCount > 8) {
      router.push("/(tabs)");
    } else {
      router.push({
        pathname: "/form/[id]",
        params: { id: id.toString() },
      });
    }
  };
  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <HeaderFormResultScreen
        theme={theme}
        width={width}
        height={height}
        id={id}
      />
      {/* contenido */}
      <ContentFormResultScreen
        theme={theme}
        width={width}
        height={height}
        correctAnswersCount={correctAnswersCount}
      />

      {/* boton */}
      <ButtonFormResultScreen
        correctAnswersCount={correctAnswersCount}
        theme={theme}
        width={width}
        height={height}
        scaleValue={scaleValue}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        handleButtonPress={handleButtonPress}
      />
    </View>
  );
};

export default FormResultScreen;
