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

export interface BaseShape {
  id: string;
  type: ToolType;
  color: string;
  thickness: number;
}

export interface FreeDrawShape extends BaseShape {
  type: 'free-draw';
  points: number[];
}

export interface LineShape extends BaseShape {
  type: 'line';
  points: number[];
}

export interface EllipseShape extends BaseShape {
  type: 'ellipse';
  color: string;
  radiusX: number;
  radiusY: number;
  x: number;
  y: number;
}

export interface RectShape extends BaseShape {
  type: 'rect';
  color: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

export type Shape = FreeDrawShape | LineShape | EllipseShape | RectShape;

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

export interface ShapeProps {
  shape: Shape;
}
