import {
    Pressable,
    View,
    useColorScheme,
    useWindowDimensions,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
import { Colors } from "../constants/theme";

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: CustomTabBarProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];

  const { width, height } = useWindowDimensions();

  const tabCount = state.routes.length;

  const containerWidth = Math.min(width * 0.9, 420);

  const containerHeight = Math.max(Math.min(height * 0.075, 70), 56);

  const tabWidth = containerWidth / tabCount;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(state.index * tabWidth, {
          damping: 50,
          stiffness: 700,
        }),
      },
    ],
  }));

  return (
    <View
      className="absolute w-full items-center"
      style={{
        bottom: Math.max(height * 0.03, 20),
      }}
    >
      <View
        className="flex-row overflow-hidden rounded-full"
        style={{
          width: containerWidth,
          height: containerHeight,
          backgroundColor: theme.secondary,

          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 10,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          elevation: 8,
        }}
      >
        {/* Cápsula activa */}
        <Animated.View
          style={[
            {
              position: "absolute",
              width: tabWidth,
              height: containerHeight,

              backgroundColor: theme.card,
              borderRadius: 999,

              shadowColor: theme.primary,
              shadowOpacity: 0.15,
              shadowRadius: 12,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              elevation: 5,
            },
            animatedStyle,
          ]}
        />

        {state.routes.map((route: any, index: number) => {
          const focused = state.index === index;

          const { options } = descriptors[route.key];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className="items-center justify-center"
              style={{
                width: tabWidth,
                height: containerHeight,
              }}
            >
              {options.tabBarIcon?.({
                focused,
                color: focused ? theme.primary : theme.muted,
                size: Math.max(Math.min(containerHeight * 0.42, 28), 20),
              })}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
