export const getThemeData = (id: string | number) => {
  switch (String(id)) {
    case "1":
      return require("./comunion/theme1.json");
    case "2":
      return require("./comunion/theme2.json");
    case "3":
      return require("./comunion/theme1.json");
    default:
      return require("./comunion/theme1.json");
  }
};
