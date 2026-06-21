import { useThemeColors } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import YoutubePlayer from "react-native-youtube-iframe";

const ThemeVideoScreen = () => {
  const { width, height } = useWindowDimensions();
  const theme = useThemeColors();
  const videoId = "dQw4w9WgXcQ";

  const [isLoading, setIsLoading] = useState(true);

  const videoPadding = width * 0.12;
  const videoWidth = width - videoPadding;
  const videoHeight = height * 0.22;

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
      className="flex-1"
      style={{ height, backgroundColor: theme.background }}
    >
      <LinearGradient
        colors={[theme.gradientPrimary[0], theme.gradientPrimary[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 2, y: 1 }}
        style={{
          height: height * 0.18,
          width,
        }}
      >
        <View
          style={{
            marginHorizontal: width * 0.06,
            marginTop: height * 0.05,
          }}
        >
          <Pressable
            style={{
              marginBottom: height * 0.01,
            }}
            className="flex-row items-center active:opacity-70"
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="chevron-back" size={26} color="white" />
            <Text className="text-2xl font-geist-bold text-white">Volver</Text>
          </Pressable>

          <View className="flex-row items-center">
            <View
              className="items-center justify-center rounded-3xl"
              style={{
                backgroundColor: theme.secondary,
                height: height * 0.07,
                width: width * 0.15,
                marginLeft: width * 0.02,
              }}
            >
              <Ionicons name="accessibility-outline" size={20} color="white" />
            </View>
            <View
              className="flex-1 justify-between"
              style={{
                marginLeft: width * 0.05,
                height: height * 0.07,
                width: width * 0.15,
              }}
            >
              <Text className="text-sm font-geist-extra-light-italic text-white">
                numero de tema
              </Text>
              <Text className="text-3xl font-geist-black text-white">
                quien es Dios?
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View
        className="items-center"
        style={{
          width: width,
          height: height * 0.28,
          paddingHorizontal: width * 0.06,
          paddingVertical: height * 0.03,
        }}
      >
        <View
          className="rounded-3xl overflow-hidden justify-center items-center"
          style={{
            width: videoWidth,
            height: videoHeight,
            backgroundColor: theme.primary,
          }}
        >
          {isLoading && (
            <View style={{ position: "absolute" }}>
              <ActivityIndicator size="large" color={theme.secondary} />
            </View>
          )}

          <YoutubePlayer
            height={videoHeight}
            width={videoWidth}
            play={false}
            videoId={videoId}
            onReady={() => setIsLoading(false)}
          />
        </View>
      </View>

      <View
        className="items-center"
        style={{
          width: width,
          height: height * 0.42,
          paddingHorizontal: width * 0.06,
        }}
      >
        <View
          className="rounded-3xl border-2"
          style={{
            width: videoWidth,
            height: height * 0.39,
            paddingVertical: height * 0.02,
            paddingHorizontal: width * 0.03,
            backgroundColor: theme.secondary,
            borderColor: theme.primary,
          }}
        >
          <View className="flex-row items-center" style={{ marginBottom: 10 }}>
            <Ionicons name="play-outline" size={20} />
            <Text className="font-geist-extra-light-italic">
              Sobre este Tema
            </Text>
          </View>
          <Text
            className="font-geist-black text-4xl"
            style={{ marginBottom: 5 }}
          >
            contenttittle
          </Text>
          <Text className="font-geist-light text-xl">
            Conoce a tu Padre Celestial. Mira el video completo y luego responde
            las preguntas para completar este tema y desbloquear el siguiente.
          </Text>
        </View>
      </View>

      <View
        className="items-end "
        style={{
          width: width,
          height: height * 0.12,
          paddingHorizontal: width * 0.06,
        }}
      >
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Pressable
            className="items-center justify-center flex-row overflow-hidden"
            style={{
              width: width * 0.4,
              height: height * 0.06,
              borderRadius: 28,
            }}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
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
              Siguiente
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
    </View>
  );
};

export default ThemeVideoScreen;
