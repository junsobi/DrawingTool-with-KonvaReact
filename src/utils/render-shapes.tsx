import Konva from 'konva';

import DrawEllipse from '@/components/drawing-tools/tools/draw-ellipse';
import DrawLine from '@/components/drawing-tools/tools/draw-line';
import DrawPolygon from '@/components/drawing-tools/tools/draw-polygon';
import DrawRect from '@/components/drawing-tools/tools/draw-rect';
import { ToolType, Shape, PolygonShape } from '@/types/types';

// 도형 타입별 렌더링할 컴포넌트를 반환하는 함수
const getShapeComponent = (type: Shape['type']): React.ElementType | null => {
  const components: Record<Shape['type'], React.ElementType> = {
    'free-draw': DrawLine,
    line: DrawLine,
    ellipse: DrawEllipse,
    rect: DrawRect,
    polygon: DrawPolygon,
  };
  return components[type] || null;
};

// 도형별 속성을 생성하는 팩토리 함수

const createShapeProps = (
  tool: ToolType,
  currentShape: number[],
  color: string,
  thickness: number,
  polygonPoints: number[][]
): Shape => {
  switch (tool) {
    case 'free-draw':
    case 'line':
      return {
        id: 'temp',
        color,
        thickness,
        type: tool,
        points: currentShape,
      };
    case 'ellipse':
      return {
        id: 'temp',
        color,
        thickness,
        type: 'ellipse',
        x: currentShape[0],
        y: currentShape[1],
        radiusX: Math.abs(currentShape[2]),
        radiusY: Math.abs(currentShape[3]),
      };
    case 'rect':
      return {
        id: 'temp',
        color,
        thickness,
        type: 'rect',
        x: currentShape[0],
        y: currentShape[1],
        width: currentShape[2],
        height: currentShape[3],
      };
    case 'polygon':
      return {
        id: 'temp',
        color,
        thickness,
        type: 'polygon',
        points: [
          ...polygonPoints.map((p) => [...p]),
          [currentShape[2], currentShape[3]],
        ] as number[][], // readonly 제거
        closed: false,
      };
    default:
      throw new Error(`Unsupported tool type: ${tool}`);
  }
};

// 기존에 그려진 도형을 렌더링하는 함수

export const renderShape = (shape: Shape) => {
  const Component = getShapeComponent(shape.type);
  return Component ? <Component key={shape.id} shape={shape} /> : null;
};

// 현재 그리고 있는 임시 도형을 렌더링하는 함수
export const renderTempShape = (
  tool: ToolType,
  currentShape: number[],
  color: string,
  thickness: number,
  polygonPoints: number[][],
  handleMouseMove: (e: Konva.KonvaEventObject<MouseEvent>) => void,
  isStartHovered: boolean
) => {
  const shapeProps = createShapeProps(
    tool,
    currentShape,
    color,
    thickness,
    polygonPoints
  );
  const Component = getShapeComponent(tool);

  if (!Component) return null;

  if (tool === 'polygon') {
    return (
      <DrawPolygon
        shape={shapeProps as PolygonShape}
        onMouseMove={handleMouseMove}
        isStartHovered={isStartHovered}
      />
    );
  }

  return <Component shape={shapeProps} />;
};
