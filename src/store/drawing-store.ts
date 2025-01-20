import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { MAX_HISTORY_SIZE } from '@/constants/constants';
import { DrawingState, StorageHandler } from '@/types/types';
import { Shape } from '@/types/types';

const safeLocalStorage: StorageHandler = {
  getItem: (key: string) => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`로컬 스토리지 키 "${key}"를 읽는 중 오류 발생:`, error);
      return null;
    }
  },
  setItem: (key: string, value: unknown) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(
        `로컬 스토리지 키 "${key}"를 저장하는 중 오류 발생:`,
        error
      );
    }
  },
  removeItem: (key: string) => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
};

export const useDrawingStore = create<DrawingState>()(
  persist(
    (set) => ({
      tool: 'free-draw',
      setTool: (tool) => set({ tool }),
      thickness: 5,
      setThickness: (thickness) => set({ thickness }),
      color: '#000000',
      setColor: (color) => set({ color }),
      shapes: [],
      history: [] as Shape[][],
      redoStack: [] as Shape[][],

      addShape: (shape) =>
        set((state) => {
          const newHistory = [...state.history, state.shapes];

          if (newHistory.length > MAX_HISTORY_SIZE) {
            newHistory.shift();
          }

          return {
            history: newHistory,
            shapes: [...state.shapes, shape],
            redoStack: [],
          };
        }),

      undo: () =>
        set((state) => {
          if (state.history.length === 0) return state;
          const previous = state.history.pop();
          return {
            shapes: previous || [],
            history: [...state.history],
            redoStack: [...state.redoStack, state.shapes],
          };
        }),

      redo: () =>
        set((state) => {
          if (state.redoStack.length === 0) return state;
          const next = state.redoStack.pop();
          return {
            shapes: next || [],
            redoStack: [...state.redoStack],
            history: [...state.history, state.shapes],
          };
        }),

      clearShapes: () =>
        set((state) => ({
          history: [...state.history, state.shapes],
          shapes: [],
          redoStack: [],
        })),
    }),
    {
      name: 'drawing-storage',
      storage: safeLocalStorage,
    }
  )
);
