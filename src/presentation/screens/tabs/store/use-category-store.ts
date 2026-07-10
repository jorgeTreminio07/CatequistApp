import { create } from "zustand";

type CategoryType = "Comunion" | "Confirmacion";

interface CategoryState {
  activeCategory: CategoryType;
  activeIndex: number;
  setCategory: (index: number) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  activeCategory: "Comunion",
  activeIndex: 0,
  setCategory: (index: number) =>
    set({
      activeIndex: index,
      activeCategory: index === 0 ? "Comunion" : "Confirmacion",
    }),
}));
