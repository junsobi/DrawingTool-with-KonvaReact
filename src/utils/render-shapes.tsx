import DrawEllipse from '@/components/drawing-tools/tools/draw-ellipse';
import DrawLine from '@/components/drawing-tools/tools/draw-line';
import DrawPolygon from '@/components/drawing-tools/tools/draw-polygon';
import DrawRect from '@/components/drawing-tools/tools/draw-rect';
import { ToolType, Shape } from '@/types/types';

const components: Record<Shape['type'], React.ElementType> = {
  'free-draw': DrawLine,
  line: DrawLine,
  ellipse: DrawEllipse,
  rect: DrawRect,
  polygon: DrawPolygon,
};

export const renderShape = (shape: Shape) => {
  const Component = components[shape.type];
  return Component ? <Component key={shape.id} shape={shape} /> : null;
};

const shapePropsFactory = (
  tool: ToolType,
  currentShape: number[],
  color: string,
  thickness: number,
  polygonPoints: number[][]
) => ({
  'free-draw': {
    id: 'temp',
    color,
    thickness,
    type: tool,
    points: currentShape,
  },
  line: { id: 'temp', color, thickness, type: tool, points: currentShape },
  ellipse: {
    id: 'temp',
    color,
    thickness,
    type: 'ellipse' as const,
    x: currentShape[0],
    y: currentShape[1],
    radiusX: Math.abs(currentShape[2]),
    radiusY: Math.abs(currentShape[3]),
  },
  rect: {
    id: 'temp',
    color,
    thickness,
    type: 'rect' as const,
    x: currentShape[0],
    y: currentShape[1],
    width: currentShape[2],
    height: currentShape[3],
  },
  polygon: {
    id: 'temp',
    color,
    thickness,
    type: 'polygon' as const,
    points: [...polygonPoints, [currentShape[2], currentShape[3]]],
    closed: false,
  },
});

export const renderTempShape = (
  tool: ToolType,
  currentShape: number[],
  color: string,
  thickness: number,
  polygonPoints: number[][]
) => {
  const props = shapePropsFactory(
    tool,
    currentShape,
    color,
    thickness,
    polygonPoints
  )[tool];
  const Component = components[tool];
  return Component ? <Component shape={props} /> : null;
};
