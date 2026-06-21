import { useAnimation } from "@/hooks/use-animation";
import { useThemeColors } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { initializeDatabase } from "@/Infrastructure/database";
import {
  ThemeVideoData,
  ThemeVideoRepository,
} from "@/Infrastructure/repository/ThemeVideoRepository";
import YoutubePlayer from "react-native-youtube-iframe";
import HeaderThemeVideoScreen from "./components/HeaderThemeVideoScreen";

const ThemeVideoScreen = () => {
  const { width, height } = useWindowDimensions();
  const theme = useThemeColors();
  const videoId = "dQw4w9WgXcQ";

  const [isLoading, setIsLoading] = useState(true);

  const videoPadding = width * 0.12;
  const videoWidth = width - videoPadding;
  const videoHeight = height * 0.22;

  const { scaleValue, onPressIn, onPressOut } = useAnimation();

  const { id } = useLocalSearchParams();

  console.log(id);
  const [tema, setTema] = useState<ThemeVideoData | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function cargarTema() {
      try {
        const db = await initializeDatabase();
        const repo = new ThemeVideoRepository(db);

        console.log(`--- Buscando Tema ID: ${id} en SQLite ---`);

        const temaFromDB = await repo.getThemeById(Number(id) || 0);

        if (isMounted) {
          setTema(temaFromDB);

          if (temaFromDB) {
            console.log(`¡Tema encontrado!: ${temaFromDB.themeTittle}`);
          } else {
            console.log("No se encontró ningún tema con ese ID.");
          }
        }
      } catch (error) {
        console.error("Error al obtener el tema de la DB:", error);
      } finally {
        if (isMounted) setCargando(false);
      }
    }

    cargarTema();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (cargando) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#6c3fc5" />
      </View>
    );
  }

  if (!tema) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>El tema solicitado no existe.</Text>
      </View>
    );
  }

  const activeColor = theme[
    `${tema.color}Color` as keyof typeof theme
  ] as string;
  const activeBg = theme[`${tema.color}Bg` as keyof typeof theme] as string;

  return (
    <View
      className="flex-1"
      style={{ height, backgroundColor: theme.background }}
    >
      <HeaderThemeVideoScreen tema={tema} activeColor={activeColor} />
      {/*video*/}
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
      {/*explicacion*/}
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
            backgroundColor: activeBg,
            borderColor: activeColor,
          }}
        >
          <View className="flex-row items-center" style={{ marginBottom: 10 }}>
            <Ionicons name="play-outline" size={20} color={activeColor} />
            <Text className="font-geist-extra-light-italic">
              Sobre este Tema
            </Text>
          </View>
          <Text
            className="font-geist-black text-4xl"
            style={{ marginBottom: 5 }}
          >
            {tema.themeTittle}
          </Text>
          <Text className="font-geist-light text-xl">{tema.content}</Text>
        </View>
      </View>
      {/*boton*/}
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
