import { PersistStorage, StorageValue } from 'zustand/middleware';

export interface StorageHandler extends PersistStorage<unknown> {
  getItem: (
    key: string
  ) => StorageValue<unknown> | Promise<StorageValue<unknown> | null> | null;
  setItem: (key: string, value: unknown) => void;
  removeItem: (key: string) => void;
}

export type ToolType = 'free-draw' | 'line' | 'ellipse' | 'rect' | 'polygon';

export type ToolItem = {
  id: ToolType;
  label: string;
  icon: React.ElementType;
};

export interface DrawingState {
  tool: ToolType;
  setTool: (tool: ToolType) => void;
  thickness: number;
  setThickness: (thickness: number) => void;
  color: string;
  setColor: (color: string) => void;
  shapes: Shape[];
  addShape: (shape: Shape) => void;
  clearShapes: () => void;
}

export interface ControlPanelProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export interface Shape {
  id: string;
  type: ToolType;
  points?: number[];
  x?: number;
  y?: number;
  endX?: number;
  endY?: number;
  color: string;
  thickness: number;
}

export interface FreeDrawProps {
  shape: Shape;
}
