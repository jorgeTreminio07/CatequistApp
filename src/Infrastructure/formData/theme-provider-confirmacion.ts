export const getThemeDataConfirmacion = (id: string | number) => {
  switch (String(id)) {
    case "1":
      return require("./confirmacion/theme1.json");
    case "2":
      return require("./confirmacion/theme2.json");
    case "3":
      return require("./confirmacion/theme1.json");
    default:
      return require("./confirmacion/theme1.json");
  }
};
