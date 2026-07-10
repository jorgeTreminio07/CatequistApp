import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Animated, Pressable, Text, View } from "react-native";

interface ButtonFormResultScreenProps {
  correctAnswersCount: number;
  theme: any;
  width: number;
  height: number;
  scaleValue: Animated.Value;
  onPressIn: () => void;
  onPressOut: () => void;
  handleButtonPress: () => void;
}

const ButtonFormResultScreen = ({
  correctAnswersCount,
  theme,
  width,
  height,
  scaleValue,
  onPressIn,
  onPressOut,
  handleButtonPress,
}: ButtonFormResultScreenProps) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Animated.View
        style={{
          transform: [{ scale: scaleValue }],
          // opacity: hasAnswered ? 1 : 0.5,
        }}
      >
        <Pressable
          className="items-center justify-center flex-row overflow-hidden"
          style={{
            width: width * 0.8,
            height: height * 0.06,
            borderRadius: 28,
          }}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={() => {
            //
            handleButtonPress();
            console.log("correctAnswersCount", correctAnswersCount);
          }}
        >
          <LinearGradient
            colors={[theme.gradientPrimary[0], theme.gradientPrimary[1]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 2, y: 1 }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          />

          <Text className="text-2xl font-geist-bold text-white z-10">
            {correctAnswersCount > 8 ? "Ver mis Temas" : "Reintentar"}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={26}
            color="white"
            className="z-10"
          />
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default ButtonFormResultScreen;
