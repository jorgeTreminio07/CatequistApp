import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded, error] = useFonts({
    "Geist-Black": require("../../assets/fonts/Geist-Black.ttf"),
    "Geist-Bold": require("../../assets/fonts/Geist-Bold.ttf"),
    "Geist-ExtraBold": require("../../assets/fonts/Geist-ExtraBold.ttf"),
    "Geist-ExtraLight": require("../../assets/fonts/Geist-ExtraLight.ttf"),
    "Geist-Italic": require("../../assets/fonts/Geist-Italic.ttf"),
    "Geist-Light": require("../../assets/fonts/Geist-Light.ttf"),
    "Geist-Medium": require("../../assets/fonts/Geist-Medium.ttf"),
    "Geist-Regular": require("../../assets/fonts/Geist-Regular.ttf"),
    "Geist-SemiBold": require("../../assets/fonts/Geist-SemiBold.ttf"),
    "Geist-Thin": require("../../assets/fonts/Geist-Thin.ttf"),
    "Geist-BlackItalic": require("../../assets/fonts/Geist-BlackItalic.ttf"),
    "Geist-BoldItalic": require("../../assets/fonts/Geist-BoldItalic.ttf"),
    "Geist-ExtraBoldItalic": require("../../assets/fonts/Geist-ExtraBoldItalic.ttf"),
    "Geist-ExtraLightItalic": require("../../assets/fonts/Geist-ExtraLightItalic.ttf"),
    "Geist-LightItalic": require("../../assets/fonts/Geist-LightItalic.ttf"),
    "Geist-MediumItalic": require("../../assets/fonts/Geist-MediumItalic.ttf"),
    "Geist-SemiBoldItalic": require("../../assets/fonts/Geist-SemiBoldItalic.ttf"),
    "Geist-ThinItalic": require("../../assets/fonts/Geist-ThinItalic.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
      console.log("Fonts loaded");
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="theme/[id]"
          options={{
            headerShown: false,
            title: "",
            //animation: "slide_from_right",
            headerShadowVisible: false,
            animation: "fade",
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
