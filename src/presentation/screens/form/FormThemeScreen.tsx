import { useAnimation } from "@/hooks/use-animation";
import { useThemeColors } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Animated,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

// Importación del archivo proveedor/router de temas
import { ThemeVideoRepository } from "@/Infrastructure/repository/ThemeVideoRepository";
import { useSQLiteContext } from "expo-sqlite";
import { getThemeData } from "../../../Infrastructure/formData/theme-provider";

const FormThemeScreen = () => {
  const { id } = useLocalSearchParams();
  const currentThemeId = Array.isArray(id) ? id[0] : id || "1";

  const db = useSQLiteContext();

  const { width, height } = useWindowDimensions();
  const theme = useThemeColors();
  const { scaleValue, onPressIn, onPressOut } = useAnimation();
  const [questionNumber, setQuestionNumber] = useState(1);
  const totalQuestions = 10;
  const porcentaje = Math.min((questionNumber / totalQuestions) * 100, 100);

  // --- ESTADOS PARA RENDEREADO Y VALIDACIÓN ---
  const [shuffledQuestionsList, setShuffledQuestionsList] = useState<any[]>([]);
  const [currentQuestionText, setCurrentQuestionText] = useState("");
  const [shuffledOptions, setShuffledOptions] = useState<
    { texto: string; esCorrecta: boolean }[]
  >([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  );
  const [hasAnswered, setHasAnswered] = useState(false);

  // --- ESTADO: CONTADOR DE ACIERTOS ---
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  // EFECTO 1: Carga inicial y mezcla general de todas las preguntas (Solo se ejecuta al montar la pantalla)
  useEffect(() => {
    const selectedThemeData = getThemeData(currentThemeId);
    const rawPreguntas = [...(selectedThemeData?.comunion?.preguntas || [])];

    // Mezclado Fisher-Yates para el orden de las preguntas
    for (let i = rawPreguntas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rawPreguntas[i], rawPreguntas[j]] = [rawPreguntas[j], rawPreguntas[i]];
    }

    // Guardamos la lista desordenada y limitamos a la cantidad total de preguntas configuradas
    setShuffledQuestionsList(rawPreguntas.slice(0, totalQuestions));
  }, [currentThemeId]);

  // EFECTO 2: Carga y mezcla las opciones de la pregunta actual basándose en la lista desordenada
  useEffect(() => {
    if (shuffledQuestionsList.length === 0) return;

    // Tomamos la pregunta usando el índice actual (questionNumber - 1)
    const preguntaActualData = shuffledQuestionsList[questionNumber - 1];

    if (preguntaActualData) {
      setCurrentQuestionText(preguntaActualData.pregunta);

      // Mapeamos las opciones guardando cuál es la correcta
      const opcionesArray = Object.entries(preguntaActualData.opciones).map(
        ([clave, texto]) => ({
          texto: texto as string,
          esCorrecta: clave === preguntaActualData.respuesta_correcta,
        }),
      );

      // Mezclado Fisher-Yates para el orden de las opciones de esta pregunta
      for (let i = opcionesArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opcionesArray[i], opcionesArray[j]] = [
          opcionesArray[j],
          opcionesArray[i],
        ];
      }

      setShuffledOptions(opcionesArray);
      setSelectedOptionIndex(null);
      setHasAnswered(false);
    }
  }, [questionNumber, shuffledQuestionsList]);

  // Manejador al presionar una opción
  const handleSelectOption = (index: number) => {
    if (hasAnswered) return;
    setSelectedOptionIndex(index);
    setHasAnswered(true);

    if (shuffledOptions[index]?.esCorrecta) {
      setCorrectAnswersCount((prev) => {
        const newCount = prev + 1;
        console.log(`Respuestas correctas acumuladas: ${newCount}`);
        return newCount;
      });
    } else {
      console.log(
        `Respuesta incorrecta. Total correctas: ${correctAnswersCount}`,
      );
    }
  };

  // Función auxiliar para calcular los estilos y contenidos dinámicos de cada opción
  const getOptionState = (index: number) => {
    const opcion = shuffledOptions[index];
    const letra = ["A", "B", "C", "D"][index];

    let borderColor: string = theme.primary;
    let badgeBgColor: string = theme.primary;

    let iconName: "checkmark-circle" | "close-circle" | null = null;
    let iconColor = "white";

    if (hasAnswered && opcion) {
      if (opcion.esCorrecta) {
        borderColor = theme.success;
        badgeBgColor = theme.success;
        iconName = "checkmark-circle";
      } else if (selectedOptionIndex === index && !opcion.esCorrecta) {
        borderColor = theme.error;
        badgeBgColor = theme.error;
        iconName = "close-circle";
      }
    }

    return {
      borderColor,
      iconName,
      iconColor,
      badgeBgColor,
      letra,
      texto: opcion?.texto || "",
    };
  };

  const handleButton = async () => {
    if (!hasAnswered) return;

    if (questionNumber < totalQuestions) {
      setQuestionNumber((prev) => prev + 1);
    } else {
      if (correctAnswersCount > 8) {
        try {
          const repository = new ThemeVideoRepository(db);
          const idNumerico = Number(id);

          await repository.setStatusDone(idNumerico);

          console.log(`Tema actualizado a 'done'. ID: ${idNumerico}`);
        } catch (error) {
          console.error("No se pudo guardar el progreso en SQLite:", error);
        }
      }
      router.push({
        pathname: "/form/result",
        params: { id: id, correctAnswers: correctAnswersCount },
      });
    }
  };

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
              router.push({
                pathname: "/theme/[id]",
                params: { id: id.toString() },
              });
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
          {/* Barra de Progreso */}
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

      {/* Contenido */}
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
              {currentQuestionText}
            </Text>
          </View>

          {/* Renderizado de Opciones */}
          {[0, 1, 2, 3].map((index) => {
            const optState = getOptionState(index);
            return (
              <Pressable
                key={index}
                onPress={() => handleSelectOption(index)}
                className="bg-white rounded-3xl border-2 flex-row justify-between items-center"
                style={{
                  width: width - width * 0.06 * 2 - width * 0.03 * 2,
                  marginHorizontal: width * 0.03,
                  marginTop: height * 0.02,
                  height: height * 0.1,
                  paddingVertical: height * 0.02,
                  paddingHorizontal: width * 0.03,
                  backgroundColor: "white",
                  borderColor: optState.borderColor,
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 4 },
                  elevation: 5,
                }}
              >
                <View className="flex-row items-center flex-1 pr-2">
                  <View
                    className="rounded-full justify-center items-center mr-4"
                    style={{
                      backgroundColor: optState.badgeBgColor,
                      width: 40,
                      height: 40,
                    }}
                  >
                    <Text className="text-lg font-geist-bold text-white">
                      {optState.letra}
                    </Text>
                  </View>
                  <Text
                    className="text-lg font-geist-bold flex-1"
                    numberOfLines={2}
                  >
                    {optState.texto}
                  </Text>
                </View>

                {optState.iconName && (
                  <Ionicons
                    name={optState.iconName}
                    size={24}
                    color={optState.borderColor}
                  />
                )}
              </Pressable>
            );
          })}
        </View>

        {/* Botón de acción */}
        <View
          className="items-end "
          style={{
            width: width,
            height: height * 0.12,
            marginTop: height * 0.03,
            paddingHorizontal: width * 0.06,
          }}
        >
          <Animated.View
            style={{
              transform: [{ scale: scaleValue }],
              opacity: hasAnswered ? 1 : 0.5,
            }}
          >
            <Pressable
              className="items-center justify-center flex-row overflow-hidden"
              style={{
                width: width * 0.4,
                height: height * 0.06,
                borderRadius: 28,
              }}
              onPressIn={hasAnswered ? onPressIn : undefined}
              onPressOut={hasAnswered ? onPressOut : undefined}
              onPress={() => {
                handleButton();
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
                {questionNumber < totalQuestions ? "Siguiente" : "Resultados"}
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
