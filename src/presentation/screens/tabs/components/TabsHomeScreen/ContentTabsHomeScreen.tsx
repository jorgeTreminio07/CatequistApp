import { useThemeColors } from "@/hooks/use-theme";
import { ThemeVideoData } from "@/Infrastructure/repository/ThemeVideoRepository";
import { router } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import ThemeCard from "./ThemeCard";

import Svg, { Path } from "react-native-svg";

interface ContentTabsHomeScreenProps {
  listaTemas: ThemeVideoData[];
  cargando: boolean;
}

const ContentTabsHomeScreen = ({
  listaTemas,
  cargando,
}: ContentTabsHomeScreenProps) => {
  const { width, height } = useWindowDimensions();
  const theme = useThemeColors();
  const headerHeight = height * 0.28;

  // Cálculos de maquetación para centrar las líneas perfectamente
  const paddingContenedor = width * 0.07;
  const anchoDisponible = width - paddingContenedor * 2;
  const anchoCard = width * 0.7;

  // Puntos centrales exactos de la Card según su lado de alineación
  const centroIzquierdo = anchoCard / 2;
  const centroDerecho = anchoDisponible - anchoCard / 2;

  const altoSvg = 40;

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
          {cargando ? (
            <ActivityIndicator
              size="large"
              color={theme.primary || "#000"}
              style={{ marginTop: 20 }}
            />
          ) : (
            listaTemas.map((tema, index) => {
              const siguienteTema = listaTemas[index + 1];

              // Coordenadas de salida (X1, Y1)
              const x1 =
                tema.position === "left" ? centroIzquierdo : centroDerecho;
              const y1 = 0;

              let x2 = x1;
              const y2 = altoSvg;
              let colorLinea = "#cbd5e1";

              if (siguienteTema) {
                x2 =
                  siguienteTema.position === "left"
                    ? centroIzquierdo
                    : centroDerecho;
                if (siguienteTema.status !== "blocked") {
                  colorLinea =
                    (theme[
                      `${siguienteTema.color}Color` as keyof typeof theme
                    ] as string) || colorLinea;
                }
              }

              // 🧠 CÁLCULO DE PUNTOS DE CONTROL BÉZIER PARA LA CURVA EN "S"
              // cp1x y cp2x controlan la curvatura horizontal para imitar el screenshot
              const cp1x = x1;
              const cp1y = altoSvg * 0.5; // Punto medio vertical para suavizar la salida
              const cp2x = x2;
              const cp2y = altoSvg * 0.5; // Punto medio vertical para suavizar la llegada

              // Sintaxis SVG Path: M = Mover a inicio, C = Curva Cúbica con (Control1, Control2, Fin)
              const pathData = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;

              return (
                <View key={tema.themeId} style={{ width: "100%" }}>
                  <ThemeCard
                    tittle={tema.themeTittle}
                    subTittle={tema.subTittle}
                    icon={tema.icon}
                    status={tema.status}
                    color={tema.color}
                    position={tema.position}
                    onPress={() => {
                      if (tema.status !== "blocked") {
                        router.push({
                          pathname: "/theme/[id]",
                          params: { id: tema.themeId },
                        });
                      }
                    }}
                  />

                  {siguienteTema && (
                    <View
                      style={{
                        width: "100%",
                        height: altoSvg,
                        marginTop: -5, // Ajuste para calzar justo al ras de los bordes del ThemeCard
                        marginBottom: -5,
                      }}
                    >
                      <Svg height="100%" width="100%">
                        <Path
                          d={pathData}
                          fill="transparent"
                          stroke={colorLinea}
                          strokeWidth="3.5"
                          strokeDasharray="6, 9" // 👈 Espaciado de puntos según la imagen
                          strokeLinecap="round" // Hace que los puntos/guiones sean redondeados
                        />
                      </Svg>
                    </View>
                  )}
                </View>
              );
            })
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ContentTabsHomeScreen;
