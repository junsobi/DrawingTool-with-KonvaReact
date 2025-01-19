import Konva from 'konva';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useDrawingStore } from '@/store/drawing-store';

export const useDrawing = () => {
  const { addShape, color, thickness, tool } = useDrawingStore();
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState<number[]>([]);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    const pos = stage?.getPointerPosition();
    if (!pos) return;

    setIsDrawing(true);

    if (tool === 'free-draw') {
      setCurrentLine([pos.x, pos.y]);
    } else if (tool === 'line') {
      setCurrentLine([pos.x, pos.y, pos.x, pos.y]);
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const pos = stage?.getPointerPosition();
    if (!pos) return;

    if (tool === 'free-draw') {
      setCurrentLine((prev) => [...prev, pos.x, pos.y]);
    } else if (tool === 'line') {
      setCurrentLine((prev) => [prev[0], prev[1], pos.x, pos.y]);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      if (tool === 'free-draw' && currentLine.length > 2) {
        addShape({
          id: uuidv4(),
          type: 'free-draw',
          points: currentLine,
          color,
          thickness,
        });
      } else if (tool === 'line') {
        addShape({
          id: uuidv4(),
          type: 'line',
          points: currentLine,
          color,
          thickness,
        });
      }
      setCurrentLine([]);
      setIsDrawing(false);
    }
  };

  return {
    currentLine,
    isDrawing,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
