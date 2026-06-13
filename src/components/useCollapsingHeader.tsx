import {
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";

export function useCollapsingHeader(headerHeight: number) {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const titleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, headerHeight],
          [0, -120],
          "clamp",
        ),
      },
      {
        scale: interpolate(
          scrollY.value,
          [0, headerHeight],
          [1, 0.45],
          "clamp",
        ),
      },
      {
        translateX: interpolate(
          scrollY.value,
          [0, headerHeight],
          [0, -90],
          "clamp",
        ),
      },
    ],
  }));

  const headerOpacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, headerHeight * 0.8],
      [1, 0],
      "clamp",
    ),
  }));

  const stickyTitleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [headerHeight * 0.6, headerHeight],
      [0, 1],
      "clamp",
    ),
  }));

  return {
    scrollHandler,
    titleStyle,
    headerOpacityStyle,
    stickyTitleStyle,
  };
}
