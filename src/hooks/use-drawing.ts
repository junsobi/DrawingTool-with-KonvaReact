import Konva from 'konva';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useDrawingStore } from '@/store/drawing-store';
import { Shape } from '@/types/types';

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
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const pos = stage?.getPointerPosition();
    if (!pos) return;

    if (tool === 'free-draw') {
      setCurrentLine((prev) => [...prev, pos.x, pos.y]);
    }
  };

  const handleMouseUp = () => {
    if (tool === 'free-draw' && currentLine.length > 2) {
      const newShape: Shape = {
        id: uuidv4(),
        type: 'free-draw',
        points: currentLine,
        color,
        thickness,
      };
      addShape(newShape);
      setCurrentLine([]);
    }
    setIsDrawing(false);
  };

  return {
    currentLine,
    isDrawing,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
