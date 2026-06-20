import { useThemeColors } from "@/hooks/use-theme";
import { router } from "expo-router";
import { ScrollView, useWindowDimensions, View } from "react-native";
import ThemeCard from "./ThemeCard";

const ContentTabsHomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const theme = useThemeColors();
  const headerHeight = height * 0.28;
  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={{ height: headerHeight }} />
      <View
        style={{
          minHeight: height,
          width,
          backgroundColor: theme.background,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingTop: 25,
          paddingBottom: 100,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            marginTop: 10,
            marginHorizontal: width * 0.07,
          }}
        >
          <ThemeCard
            tittle="Quien es Dios?"
            subTittle="Catequesis 2"
            icon="book"
            status="done"
            color="biblia"
            position="left"
            onPress={() => {
              router.push("/theme/[id]");
            }}
          />
          <ThemeCard
            tittle="Quien es Dios?"
            subTittle="Catequesis 1"
            icon="home"
            status="start"
            color="jesus"
            position="right"
            onPress={() => {
              console.log("hola");
            }}
          />

          <ThemeCard
            tittle="Quien es Dios?"
            subTittle="Catequesis 3"
            icon="person"
            status="blocked"
            position="left"
            color="sacramentos"
            onPress={() => {
              console.log("hola");
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ContentTabsHomeScreen;
