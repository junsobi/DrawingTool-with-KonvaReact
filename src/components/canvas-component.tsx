'use client';

import { Stage, Layer } from 'react-konva';

import { useDrawing } from '@/hooks/use-drawing';
import { useDrawingStore } from '@/store/drawing-store';

import DrawLine from './tools/draw-line';
const CanvasComponent = () => {
  const { shapes, color, thickness, tool } = useDrawingStore();

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    currentLine,
    isDrawing,
  } = useDrawing();

  return (
    <Stage
      width={800}
      height={600}
      className="border rounded-md shadow-sm bg-white"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {shapes.map((shape) =>
          shape.type === 'free-draw' || shape.type === 'line' ? (
            <DrawLine key={shape.id} shape={shape} />
          ) : null
        )}

        {/* 실시간 드로잉 */}
        {isDrawing && tool === 'free-draw' && (
          <DrawLine
            shape={{
              id: 'temp',
              type: 'free-draw',
              points: currentLine,
              color,
              thickness,
            }}
          />
        )}

        {isDrawing && tool === 'line' && (
          <DrawLine
            shape={{
              id: 'temp',
              type: 'line',
              points: currentLine,
              color,
              thickness,
            }}
          />
        )}
      </Layer>
    </Stage>
  );
};

export default CanvasComponent;
