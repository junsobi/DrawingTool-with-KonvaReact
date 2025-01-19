import { create } from 'zustand';
import { DrawingState } from '@/types/types';

export const useDrawingStore = create<DrawingState>((set) => ({
  tool: 'free-draw',
  setTool: (tool) => set({ tool }),
}));
