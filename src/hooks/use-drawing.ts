import Konva from 'konva';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useDrawingStore } from '@/store/drawing-store';

export const useDrawing = () => {
  const { addShape, color, thickness, tool } = useDrawingStore();
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState<number[]>([]);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    const pos = stage?.getPointerPosition();
    if (!pos) return;

    setIsDrawing(true);

    if (tool === 'free-draw' || tool === 'line') {
      setCurrentShape([pos.x, pos.y]);
    } else if (tool === 'ellipse') {
      setCurrentShape([pos.x, pos.y, 0, 0]); // x, y, radiusX, radiusY 초기값
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const pos = stage?.getPointerPosition();
    if (!pos) return;

    if (tool === 'free-draw') {
      setCurrentShape((prev) => [...prev, pos.x, pos.y]);
    } else if (tool === 'line') {
      setCurrentShape((prev) => [prev[0], prev[1], pos.x, pos.y]);
    } else if (tool === 'ellipse') {
      setCurrentShape((prev) => [
        prev[0],
        prev[1],
        Math.abs(pos.x - prev[0]),
        Math.abs(pos.y - prev[1]),
      ]);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && currentShape.length > 2) {
      if (tool === 'free-draw') {
        addShape({
          id: uuidv4(),
          type: 'free-draw',
          points: currentShape,
          color,
          thickness,
        });
      } else if (tool === 'line') {
        addShape({
          id: uuidv4(),
          type: 'line',
          points: [
            currentShape[0],
            currentShape[1],
            currentShape[2],
            currentShape[3],
          ],
          color,
          thickness,
        });
      } else if (tool === 'ellipse') {
        addShape({
          id: uuidv4(),
          type: 'ellipse',
          x: currentShape[0],
          y: currentShape[1],
          radiusX: Math.abs(currentShape[2]),
          radiusY: Math.abs(currentShape[3]),
          color,
          thickness,
        });
      }
      setCurrentShape([]);
      setIsDrawing(false);
    }
  };

  return {
    currentShape,
    isDrawing,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
