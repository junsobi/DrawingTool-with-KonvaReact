'use client';

import { Stage, Layer } from 'react-konva';

import { useDrawing } from '@/hooks/use-drawing';
import { useDrawingStore } from '@/store/drawing-store';

import FreeDraw from './tools/free-draw';

const CanvasComponent = () => {
  const { shapes, color, thickness } = useDrawingStore();

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
        {/* 저장된 도형들 렌더링 */}
        {shapes.map((shape) =>
          shape.type === 'free-draw' ? (
            <FreeDraw key={shape.id} shape={shape} />
          ) : null
        )}

        {/* 실시간 드로잉 */}
        {isDrawing && (
          <FreeDraw
            shape={{
              id: 'temp',
              type: 'free-draw',
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
