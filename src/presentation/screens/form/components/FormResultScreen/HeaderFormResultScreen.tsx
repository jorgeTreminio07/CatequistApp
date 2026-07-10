import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface HeaderFormResultScreenProps {
  theme: any;
  width: number;
  height: number;
  id: string | string[];
}

const HeaderFormResultScreen = ({
  theme,
  width,
  height,
  id,
}: HeaderFormResultScreenProps) => {
  return (
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
  );
};

export default HeaderFormResultScreen;
