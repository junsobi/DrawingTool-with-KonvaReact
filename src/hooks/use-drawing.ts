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
    } else if (tool === 'ellipse' || tool === 'rect') {
      setCurrentShape([pos.x, pos.y, 0, 0]);
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
    } else if (tool === 'rect') {
      setCurrentShape((prev) => [
        prev[0],
        prev[1],
        pos.x - prev[0],
        pos.y - prev[1],
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
          x: Math.min(currentShape[0], currentShape[0] + currentShape[2]),
          y: Math.min(currentShape[1], currentShape[1] + currentShape[3]),
          radiusX: Math.abs(currentShape[2]),
          radiusY: Math.abs(currentShape[3]),
          color,
          thickness,
        });
      } else if (tool === 'rect') {
        const x =
          currentShape[2] < 0
            ? currentShape[0] + currentShape[2]
            : currentShape[0];
        const y =
          currentShape[3] < 0
            ? currentShape[1] + currentShape[3]
            : currentShape[1];
        const width = Math.abs(currentShape[2]);
        const height = Math.abs(currentShape[3]);

        addShape({
          id: uuidv4(),
          type: 'rect',
          x,
          y,
          width,
          height,
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
