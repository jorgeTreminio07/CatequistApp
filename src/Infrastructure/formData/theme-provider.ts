// src/Infrastructure/formData/theme-provider.ts

export const getThemeData = (id: string | number) => {
  switch (String(id)) {
    case "1":
      return require("./comunion/theme1.json"); // <-- Cambiado de "../formData/" a "./"
    case "2":
      return require("./comunion/theme2.json");
    case "3":
      return require("./comunion/theme1.json");
    default:
      return require("./comunion/theme1.json");
  }
};
