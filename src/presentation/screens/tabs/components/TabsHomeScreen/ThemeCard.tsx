import { useThemeColors } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRef } from "react";

import {
    Animated,
    Pressable,
    PressableProps,
    Text,
    useWindowDimensions,
    View,
} from "react-native";

type Status = "start" | "blocked" | "done";
type ThemeVariant = "dios" | "jesus" | "biblia" | "sacramentos" | "oracion";
type Position = "left" | "center" | "right";

interface ThemeCardProps extends PressableProps {
  tittle?: string;
  subTittle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  status?: Status;
  color?: ThemeVariant;
  position?: Position;
}

const ThemeCard = ({
  tittle,
  subTittle,
  icon,
  status,
  color = "dios",
  position = "left",
  ...props
}: ThemeCardProps) => {
  const { width, height } = useWindowDimensions();
  const theme = useThemeColors();

  const activeColor = theme[`${color}Color` as keyof typeof theme] as string;
  const activeBg = theme[`${color}Bg` as keyof typeof theme] as string;
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.93,
      useNativeDriver: true,
      bounciness: 10,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
      tension: 40,
    }).start();
  };

  return (
    <View
      className="w-full"
      style={{ alignItems: position === "left" ? "flex-start" : "flex-end" }}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Pressable
          className="flex-row items-center justify-start border-2"
          style={{
            width: width * 0.7,
            height: height * 0.08,
            padding: 20,
            borderColor: status === "blocked" ? "gray" : activeColor,
            backgroundColor: status === "blocked" ? "#e5e7eb" : activeBg,
            marginBottom: 50,
            borderRadius: 20,
          }}
          onPressIn={onPressIn} // Se ejecuta apenas pones el dedo
          onPressOut={onPressOut}
          onPress={props.onPress}
          disabled={status === "blocked"}
        >
          <View
            className="items-center justify-center rounded-full"
            style={{
              backgroundColor: status === "blocked" ? "gray" : activeColor,
              height: height * 0.05,
              width: width * 0.11,
            }}
          >
            <Text>
              <Ionicons
                name={status === "blocked" ? "close-outline" : icon}
                size={20}
                color="white"
              />
            </Text>
          </View>
          <View
            className="justify-start"
            style={{ marginLeft: width * 0.1 * 0.3 }}
          >
            <Text className="font-bold text-sm">{tittle}</Text>
            <Text className=" color-gray-500">{subTittle}</Text>
          </View>
          <View style={{ marginLeft: width * 0.6 * 0.3 }}>
            {status === "start" && (
              <MaterialCommunityIcons
                name="star-circle-outline"
                size={30}
                color={activeColor}
              />
            )}
            {status === "blocked" && (
              <Feather name="lock" size={30} color="gray" />
            )}
            {status === "done" && (
              <Ionicons
                name="checkmark-done-circle-outline"
                size={30}
                color={theme.success}
              />
            )}
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default ThemeCard;
