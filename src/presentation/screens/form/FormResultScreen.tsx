import { useAnimation } from "@/hooks/use-animation";
import { useThemeColors } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import {
  Animated,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
const FormResultScreen = () => {
  const { id, correctAnswers } = useLocalSearchParams();

  if (!id || !correctAnswers) return null;

  const correctAnswersCount = Number(correctAnswers);

  const { scaleValue, onPressIn, onPressOut } = useAnimation();

  const theme = useThemeColors();
  const { width, height } = useWindowDimensions();

  const handleButtonPress = () => {
    if (correctAnswersCount > 8) {
      router.push("/(tabs)");
    } else {
      router.push({
        pathname: "/form/[id]",
        params: { id: id.toString() },
      });
    }
  };
  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
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
              router.push({
                pathname: "/theme/[id]",
                params: { id: id.toString() },
              });
            }}
          >
            <Ionicons name="chevron-back" size={26} color="white" />
            <Text className="text-2xl font-geist-bold text-white">Volver</Text>
          </Pressable>

          <View className="flex-row items-center">
            <View
              className="flex-1"
              style={{
                marginLeft: width * 0.02,
                marginTop: height * 0.025,
              }}
            >
              <Text className="text-2xl font-geist-black text-white">
                Resultados
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      {/* contenido */}
      <View
        className="items-center justify-center"
        style={{ paddingTop: height * 0.15 }}
      >
        <View
          style={{
            alignItems: "center",
            backgroundColor:
              correctAnswersCount > 8 ? theme.success : theme.error,
            padding: 20,
            borderRadius: 100,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Ionicons name="trophy-outline" size={80} color="white" />
        </View>

        <View style={{ marginTop: height * 0.02, marginBottom: height * 0.01 }}>
          {correctAnswersCount > 8 ? (
            <Text className="text-2xl font-geist-bold">¡Felicitaciones!</Text>
          ) : (
            <Text className="text-2xl font-geist-bold">¡Sigue intentando!</Text>
          )}
        </View>

        <Text className="text-xl font-geist-light-italic color-gray-500">
          Obtuviste {correctAnswersCount} de 10 preguntas correctas
        </Text>

        <View
          className="items-center justify-center p-4 mt-4"
          style={{
            backgroundColor:
              correctAnswersCount > 8 ? theme.success : theme.error,
            height: height * 0.1,
            width: width * 0.8,
            marginTop: height * 0.02,
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          {correctAnswersCount > 8 ? (
            <Text className="text-xl font-geist-regular text-white text-center">
              ¡Has desbloqueado el siguiente tema! Continúa tu camino de fe.
            </Text>
          ) : (
            <Text className="text-xl font-geist-regular text-white text-center">
              No te desanimes. Repasa el video y vuelve a intentarlo. ¡Tú
              puedes!{" "}
            </Text>
          )}
        </View>
      </View>

      {/* boton */}
      <View className="flex-1 items-center justify-center">
        <Animated.View
          style={{
            transform: [{ scale: scaleValue }],
            // opacity: hasAnswered ? 1 : 0.5,
          }}
        >
          <Pressable
            className="items-center justify-center flex-row overflow-hidden"
            style={{
              width: width * 0.8,
              height: height * 0.06,
              borderRadius: 28,
            }}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => {
              //
              handleButtonPress();
              console.log("correctAnswersCount", correctAnswersCount);
            }}
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
              {correctAnswersCount > 8 ? "Ver mis Temas" : "Reintentar"}
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

export default FormResultScreen;
