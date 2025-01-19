export type ToolType = 'free-draw' | 'line' | 'ellipse' | 'rect' | 'polygon';

export type ToolItem = {
  id: ToolType;
  label: string;
  icon: React.ElementType;
};
