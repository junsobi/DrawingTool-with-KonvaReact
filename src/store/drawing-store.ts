import { create } from 'zustand';

import { DrawingState } from '@/types/types';

export const useDrawingStore = create<DrawingState>((set) => ({
  tool: 'free-draw',
  setTool: (tool) => set({ tool }),
  thickness: 5,
  setThickness: (thickness) => set({ thickness }),
  color: '#000000',
  setColor: (color) => set({ color }),
  shapes: [],
  addShape: (shape) => set((state) => ({ shapes: [...state.shapes, shape] })),
  clearShapes: () => set({ shapes: [] }),
}));
