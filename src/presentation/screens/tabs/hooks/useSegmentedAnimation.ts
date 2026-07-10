import { useWindowDimensions } from "react-native";
import { useAnimatedStyle, withSpring } from "react-native-reanimated";

interface UseSegmentedAnimationProps {
  activeIndex: number;
  buttonCount: number;
}

export function useSegmentedAnimation({
  activeIndex,
  buttonCount,
}: UseSegmentedAnimationProps) {
  const { width, height } = useWindowDimensions();

  // Dimensiones basadas en tu contenedor de botones
  const containerWidth = width;
  const containerHeight = height * 0.05;
  const buttonWidth = containerWidth / buttonCount;

  // Animación del fondo basada en el botón activo
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(activeIndex * buttonWidth, {
          damping: 50,
          stiffness: 700,
        }),
      },
    ],
  }));

  return {
    containerWidth,
    containerHeight,
    buttonWidth,
    animatedStyle,
  };
}
