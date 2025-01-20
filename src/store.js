import { create } from 'zustand';

const useStore = create((set) => ({
  lecturaActual: 0,
  progreso: {
    comprension: 0,
    vocabulario: 0,
    pensamiento_critico: 0
  },
  setLecturaActual: (indice) => set({ lecturaActual: indice }),
  actualizarProgreso: (tipo, valor) =>
    set((state) => ({
      progreso: {
        ...state.progreso,
        [tipo]: valor
      }
    }))
}));

export default useStore;
