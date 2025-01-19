'use client';
import { useDrawingStore } from '@/store/drawing-store';

import { Button } from './ui/button';

const ClearShapes = () => {
  const clearShapes = useDrawingStore((state) => state.clearShapes);

  return (
    <div className="flex justify-end w-full">
      <Button variant="outline" onClick={clearShapes}>
        캔버스 초기화
      </Button>
    </div>
  );
};

export default ClearShapes;
