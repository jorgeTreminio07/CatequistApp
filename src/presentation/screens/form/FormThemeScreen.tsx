import { useAnimation } from "@/hooks/use-animation";
import { useThemeColors } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Animated,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

const FormThemeScreen = () => {
  const { id } = useLocalSearchParams();
  const { width, height } = useWindowDimensions();
  const theme = useThemeColors();
  const { scaleValue, onPressIn, onPressOut } = useAnimation();
  const [questionNumber, setQuestionNumber] = useState(1);
  const totalQuestions = 10;
  const porcentaje = Math.min((questionNumber / totalQuestions) * 100, 100);
  return (
    <View
      className="flex-1"
      style={{ height, backgroundColor: theme.secondary }}
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
            className="flex-row items-center active:opacity-70"
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="chevron-back" size={26} color="white" />
            <Text className="text-2xl font-geist-bold text-white">Volver</Text>
          </Pressable>

          <View
            className="flex-row justify-between"
            style={{
              marginHorizontal: width * 0.03,
              marginTop: height * 0.01,
            }}
          >
            <Text className="text-3xl font-geist-black text-white">
              Preguntas
            </Text>
            <Text className="text-2xl font-geist-regular text-white">
              {questionNumber}/{totalQuestions}
            </Text>
          </View>
          {/* 2. Barra de Progreso */}
          <View
            className="rounded-full overflow-hidden"
            style={{
              width: width - width * 0.06 * 2 - width * 0.03 * 2,
              marginHorizontal: width * 0.03,
              marginTop: 12,
              height: 10,
              backgroundColor: "rgba(255, 255, 255, 0.25)",
            }}
          >
            <View
              className="h-full rounded-full"
              style={{
                width: `${porcentaje}%`,
                backgroundColor: theme.accent || "#f5c842",
              }}
            />
          </View>
        </View>
      </LinearGradient>
      {/* 2. Contenido */}
      <View
        className="items-center"
        style={{
          width: width,
          height: height * 0.42,
          paddingHorizontal: width * 0.06,
          paddingTop: height * 0.04,
        }}
      >
        <View>
          <View
            className="bg-white rounded-3xl border-2"
            style={{
              width: width - width * 0.06 * 2 - width * 0.03 * 2,
              marginHorizontal: width * 0.03,
              marginTop: height * 0.01,
              height: height * 0.14,
              paddingVertical: height * 0.02,
              paddingHorizontal: width * 0.03,
              backgroundColor: "white",
              borderColor: theme.primary,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 5,
            }}
          >
            <Text className="text-sm font-geist-light-italic">
              Pregunta {questionNumber}
            </Text>
            <Text className="text-xl font-geist-bold">
              contenido pregunta {questionNumber}
            </Text>
          </View>

          <View
            className="bg-white rounded-3xl border-2 flex-row justify-start items-center"
            style={{
              width: width - width * 0.06 * 2 - width * 0.03 * 2,
              marginHorizontal: width * 0.03,
              marginTop: height * 0.02,
              height: height * 0.1,
              paddingVertical: height * 0.02,
              paddingHorizontal: width * 0.03,
              backgroundColor: "white",
              borderColor: theme.primary,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 5,
            }}
          >
            <View
              className="rounded-full justify-center items-center mr-4"
              style={{ backgroundColor: theme.primary, width: 40, height: 40 }}
            >
              <Text className="text-lg font-geist-bold text-white">A</Text>
            </View>

            <Text className="text-lg font-geist-bold">caja 2</Text>
          </View>
          <View
            className="bg-white rounded-3xl border-2 flex-row justify-start items-center"
            style={{
              width: width - width * 0.06 * 2 - width * 0.03 * 2,
              marginHorizontal: width * 0.03,
              marginTop: height * 0.02,
              height: height * 0.1,
              paddingVertical: height * 0.02,
              paddingHorizontal: width * 0.03,
              backgroundColor: "white",
              borderColor: theme.primary,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 5,
            }}
          >
            <View
              className="rounded-full justify-center items-center mr-4"
              style={{ backgroundColor: theme.primary, width: 40, height: 40 }}
            >
              <Text className="text-lg font-geist-bold text-white">B</Text>
            </View>
            <Text className="text-lg font-geist-bold">caja 3</Text>
          </View>
          <View
            className="bg-white rounded-3xl border-2 flex-row justify-start items-center"
            style={{
              width: width - width * 0.06 * 2 - width * 0.03 * 2,
              marginHorizontal: width * 0.03,
              marginTop: height * 0.02,
              height: height * 0.1,
              paddingVertical: height * 0.02,
              paddingHorizontal: width * 0.03,
              backgroundColor: "white",
              borderColor: theme.primary,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 5,
            }}
          >
            <View
              className="rounded-full justify-center items-center mr-4"
              style={{ backgroundColor: theme.primary, width: 40, height: 40 }}
            >
              <Text className="text-lg font-geist-bold text-white">C</Text>
            </View>
            <Text className="text-lg font-geist-bold">caja 4</Text>
          </View>
          <View
            className="bg-white rounded-3xl border-2 flex-row justify-start items-center"
            style={{
              width: width - width * 0.06 * 2 - width * 0.03 * 2,
              marginHorizontal: width * 0.03,
              marginTop: height * 0.02,
              height: height * 0.1,
              paddingVertical: height * 0.02,
              paddingHorizontal: width * 0.03,
              backgroundColor: "white",
              borderColor: theme.primary,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 5,
            }}
          >
            <View
              className="rounded-full justify-center items-center mr-4"
              style={{ backgroundColor: theme.primary, width: 40, height: 40 }}
            >
              <Text className="text-lg font-geist-bold text-white">D</Text>
            </View>
            <Text className="text-lg font-geist-bold">caja 5</Text>
          </View>
        </View>
        {/* 3. boton */}
        <View
          className="items-end "
          style={{
            width: width,
            height: height * 0.12,
            marginTop: height * 0.03,
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
              onPress={() =>
                setQuestionNumber((prev) => Math.min(prev + 1, totalQuestions))
              }
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
    </View>
  );
};

export default FormThemeScreen;
