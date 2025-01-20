import { Stage, Layer } from 'react-konva';

import { useDrawing } from '@/hooks/use-drawing';
import { useDrawingStore } from '@/store/drawing-store';
import { renderShape, renderTempShape } from '@/utils/render-shapes';

const CanvasComponent = () => {
  const { shapes, color, thickness, tool } = useDrawingStore();
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    currentShape,
    isDrawing,
    polygonPoints,
  } = useDrawing();

  const stageProps = {
    width: 800,
    height: 600,
    className: 'border rounded-md shadow-sm bg-white',
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
  };

  return (
    <Stage {...stageProps}>
      <Layer>
        {shapes.map(renderShape)}
        {isDrawing &&
          renderTempShape(tool, currentShape, color, thickness, polygonPoints)}
      </Layer>
    </Stage>
  );
};

export default CanvasComponent;
