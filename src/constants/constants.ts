import { Pencil, Square, Circle, Spline, PencilLine } from 'lucide-react';

import { ToolItem } from '@/types/types';

export const TOOLS: ToolItem[] = [
  { id: 'free-draw', label: '자유', icon: Pencil },
  { id: 'line', label: '직선', icon: PencilLine },
  { id: 'ellipse', label: '타원', icon: Circle },
  { id: 'rect', label: '직사각형', icon: Square },
  { id: 'polygon', label: '폴리곤', icon: Spline },
];
