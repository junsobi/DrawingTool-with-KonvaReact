import Konva from 'konva';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useDrawingStore } from '@/store/drawing-store';
import { ToolType, PolygonDrawingState } from '@/types/types';
import {
  handleShapeMouseDown,
  handlePolygonMouseDown,
  createShape,
  resetPolygonDrawing,
  resetDrawing,
} from '@/utils/drawing-utils';

export const useDrawing = () => {
  const { addShape, color, thickness, tool } = useDrawingStore();
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState<number[]>([]);
  const [polygonPoints, setPolygonPoints] = useState<number[][]>([]);
  const [isPolygonFinished, setIsPolygonFinished] = useState(false);

  // polygon에서 사용될 호버링 변수
  const [isStartHovered, setIsStartHovered] = useState(false);

  const polygonState: PolygonDrawingState = {
    polygonPoints,
    isDrawing,
    currentShape,
    isPolygonFinished,
    setPolygonPoints,
    setIsDrawing,
    setCurrentShape,
    setIsPolygonFinished,
  };

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    const pos = stage?.getPointerPosition();
    if (!pos) return;

    setIsDrawing(true);

    if (tool === 'polygon') {
      handlePolygonMouseDown(pos, polygonState);
    } else {
      handleShapeMouseDown(tool as ToolType, pos, setCurrentShape);
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const pos = stage?.getPointerPosition();
    if (!pos) return;

    const updateShape = (newShape: number[]) => setCurrentShape(newShape);

    switch (tool) {
      case 'polygon':
        if (polygonPoints.length > 0) {
          setCurrentShape([
            polygonPoints[polygonPoints.length - 1][0],
            polygonPoints[polygonPoints.length - 1][1],
            pos.x,
            pos.y,
          ]);

          // 시작점과의 거리 계산하여 hover 상태 업데이트
          const firstPoint = polygonPoints[0];
          const distance = Math.hypot(
            firstPoint[0] - pos.x,
            firstPoint[1] - pos.y
          );
          setIsStartHovered(distance < 10);
        }
        break;
      case 'free-draw':
        setCurrentShape((prev) => [...prev, pos.x, pos.y]);
        break;
      case 'line':
        updateShape([currentShape[0], currentShape[1], pos.x, pos.y]);
        break;
      case 'ellipse':
        updateShape([
          currentShape[0],
          currentShape[1],
          Math.abs(pos.x - currentShape[0]),
          Math.abs(pos.y - currentShape[1]),
        ]);
        break;
      case 'rect':
        updateShape([
          currentShape[0],
          currentShape[1],
          pos.x - currentShape[0],
          pos.y - currentShape[1],
        ]);
        break;
    }
  };

  const handleMouseUp = () => {
    if (tool === 'polygon') {
      if (isPolygonFinished) {
        addShape({
          id: uuidv4(),
          type: 'polygon',
          points: polygonPoints,
          color,
          thickness,
          closed: true,
        });
        resetPolygonDrawing(polygonState);
      }
      return;
    }

    if (isDrawing && currentShape.length > 2) {
      addShape(createShape(tool, currentShape, color, thickness));
    }

    resetDrawing({ setCurrentShape, setIsDrawing });
  };

  return {
    currentShape,
    isDrawing,
    isStartHovered,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    polygonPoints,
    isPolygonFinished,
  };
};
