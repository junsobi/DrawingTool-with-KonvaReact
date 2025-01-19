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
}

export interface ControlPanelProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}
