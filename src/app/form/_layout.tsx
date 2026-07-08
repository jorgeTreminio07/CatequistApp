import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { SafeAreaProvider } from "react-native-safe-area-context";

const FormLayout = () => {
  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName="app_database_v3.db">
        <Stack>
          <Stack.Screen name="[id]" options={{ headerShown: false }} />
          <Stack.Screen name="result" options={{ headerShown: false }} />
        </Stack>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
};

export default FormLayout;
