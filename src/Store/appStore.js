import { create } from "zustand";

const appData = (set, get) => ({
  calcResult: "--",
  setCalcResult: (value) =>
    set(() => ({
      calcResult: value,
    })),
});

const useAppData = create(appData);

export default useAppData;
