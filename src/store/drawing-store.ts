import { create } from 'zustand';

type Tool = 'free-draw' | 'line' | 'rect' | 'ellipse' | 'polygon';

interface DrawingState {
  tool: Tool;
  setTool: (tool: Tool) => void;
}

export const useDrawingStore = create<DrawingState>((set) => ({
  tool: 'free-draw',
  setTool: (tool) => set({ tool }),
}));
