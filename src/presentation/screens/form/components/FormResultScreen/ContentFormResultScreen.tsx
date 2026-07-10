import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface ContentFormResultScreenProps {
  correctAnswersCount: number;
  theme: any;
  width: number;
  height: number;
}

const ContentFormResultScreen = ({
  correctAnswersCount,
  theme,
  width,
  height,
}: ContentFormResultScreenProps) => {
  return (
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
  );
};

export default ContentFormResultScreen;
