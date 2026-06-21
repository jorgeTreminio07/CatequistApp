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
          className="flex-row items-center border-2"
          style={{
            width: width * 0.7,
            height: height * 0.09,
            paddingHorizontal: 16,
            borderColor: status === "blocked" ? "#cbd5e1" : activeColor,
            backgroundColor: status === "blocked" ? "#f1f5f9" : activeBg,
            marginBottom: 40,
            borderRadius: 20,
          }}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={props.onPress}
          disabled={status === "blocked"}
        >
          <View
            className="items-center justify-center rounded-full"
            style={{
              backgroundColor: status === "blocked" ? "#94a3b8" : activeColor,
              height: 42,
              width: 42,
            }}
          >
            <Ionicons
              name={status === "blocked" ? "lock-closed" : icon}
              size={20}
              color="white"
            />
          </View>

          <View style={{ flex: 1, marginLeft: 12, marginRight: 8 }}>
            <Text
              className="font-bold text-sm"
              numberOfLines={1}
              style={{
                color: status === "blocked" ? "#64748b" : theme.foreground,
              }}
            >
              {tittle}
            </Text>
            <Text className="text-xs color-gray-500" numberOfLines={1}>
              {subTittle}
            </Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 32,
            }}
          >
            {status === "start" && (
              <MaterialCommunityIcons
                name="star-circle-outline"
                size={28}
                color={activeColor}
              />
            )}
            {status === "blocked" && (
              <Feather name="lock" size={22} color="#94a3b8" />
            )}
            {status === "done" && (
              <Ionicons
                name="checkmark-done-circle"
                size={28}
                color={theme.success || "#2bb87a"}
              />
            )}
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default ThemeCard;
