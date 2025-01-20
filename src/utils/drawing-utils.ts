import { v4 as uuidv4 } from 'uuid';

import { ToolType, Shape, Position, PolygonDrawingState } from '@/types/types';

export const handleShapeMouseDown = (
  tool: ToolType,
  pos: Position,
  setCurrentShape: (shape: number[]) => void
) => {
  switch (tool) {
    case 'free-draw':
    case 'line':
      setCurrentShape([pos.x, pos.y]);
      break;
    case 'ellipse':
    case 'rect':
      setCurrentShape([pos.x, pos.y, 0, 0]);
      break;
  }
};

export const handlePolygonMouseDown = (
  pos: Position,
  state: PolygonDrawingState
) => {
  if (
    state.polygonPoints.length > 2 &&
    isCloseToFirstPoint(pos, state.polygonPoints)
  ) {
    state.setIsPolygonFinished(true);
    return;
  }
  state.setPolygonPoints([...state.polygonPoints, [pos.x, pos.y]]);
  state.setCurrentShape([pos.x, pos.y, pos.x, pos.y]);
};

export const isCloseToFirstPoint = (
  pos: Position,
  polygonPoints: number[][]
): boolean => {
  const [firstX, firstY] = polygonPoints[0];
  const distance = Math.hypot(firstX - pos.x, firstY - pos.y);
  return distance < 10;
};

export const createShape = (
  tool: ToolType,
  shapeData: number[],
  color: string,
  thickness: number
): Shape => {
  switch (tool) {
    case 'free-draw':
    case 'line':
      return {
        id: uuidv4(),
        type: tool,
        points: shapeData,
        color,
        thickness,
      };
    case 'ellipse':
      return {
        id: uuidv4(),
        type: 'ellipse',
        x: Math.min(shapeData[0], shapeData[0] + shapeData[2]),
        y: Math.min(shapeData[1], shapeData[1] + shapeData[3]),
        radiusX: Math.abs(shapeData[2]),
        radiusY: Math.abs(shapeData[3]),
        color,
        thickness,
      };
    case 'rect':
      return {
        id: uuidv4(),
        type: 'rect',
        x: shapeData[2] < 0 ? shapeData[0] + shapeData[2] : shapeData[0],
        y: shapeData[3] < 0 ? shapeData[1] + shapeData[3] : shapeData[1],
        width: Math.abs(shapeData[2]),
        height: Math.abs(shapeData[3]),
        color,
        thickness,
      };
    default:
      throw new Error(`Unhandled tool: ${tool}`);
  }
};

export const resetPolygonDrawing = (state: PolygonDrawingState) => {
  state.setPolygonPoints([]);
  state.setIsDrawing(false);
  state.setCurrentShape([]);
  state.setIsPolygonFinished(false);
};

export const resetDrawing = (state: {
  setCurrentShape: (shape: number[]) => void;
  setIsDrawing: (drawing: boolean) => void;
}) => {
  state.setCurrentShape([]);
  state.setIsDrawing(false);
};
