import { useRef } from "react";
import { Animated } from "react-native";

export const useAnimation = () => {
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

  return {
    scaleValue,
    onPressIn,
    onPressOut,
  };
};
