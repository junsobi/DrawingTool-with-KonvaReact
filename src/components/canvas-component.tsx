import { Stage, Layer } from 'react-konva';

import { useDrawing } from '@/hooks/use-drawing';
import { useDrawingStore } from '@/store/drawing-store';

import DrawEllipse from './tools/draw-ellipse';
import DrawLine from './tools/draw-line';
import DrawRect from './tools/draw-rect';

const CanvasComponent = () => {
  const { shapes, color, thickness, tool } = useDrawingStore();

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    currentShape,
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
        {shapes.map((shape) => {
          switch (shape.type) {
            case 'free-draw':
            case 'line':
              return <DrawLine key={shape.id} shape={shape} />;
            case 'ellipse':
              return <DrawEllipse key={shape.id} shape={shape} />;
            case 'rect':
              return <DrawRect key={shape.id} shape={shape} />;
            default:
              return null;
          }
        })}

        {isDrawing && (tool === 'free-draw' || tool === 'line') && (
          <DrawLine
            shape={{
              id: 'temp',
              type: tool,
              points: currentShape,
              color,
              thickness,
            }}
          />
        )}
        {isDrawing && tool === 'ellipse' && (
          <DrawEllipse
            shape={{
              id: 'temp',
              type: 'ellipse',
              x: currentShape[0],
              y: currentShape[1],
              radiusX: Math.abs(currentShape[2]),
              radiusY: Math.abs(currentShape[3]),
              color,
              thickness,
            }}
          />
        )}
        {isDrawing && tool === 'rect' && (
          <DrawRect
            shape={{
              id: 'temp',
              type: 'rect',
              x: currentShape[0],
              y: currentShape[1],
              width: currentShape[2],
              height: currentShape[3],
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
