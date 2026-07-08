import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const FormResultScreen = () => {
  const { id, correctAnswers } = useLocalSearchParams();
  return (
    <View>
      <Text>FormResultScreen</Text>
      <Text>ID: {id}</Text>
      <Text>Correct Answers: {correctAnswers}</Text>
    </View>
  );
};

export default FormResultScreen;
