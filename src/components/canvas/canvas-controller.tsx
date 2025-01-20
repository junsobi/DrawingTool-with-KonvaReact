'use client';
import { Undo, Redo } from 'lucide-react';

import { useDrawingStore } from '@/store/drawing-store';

import { Button } from '../ui/button';

const CanvasController = () => {
  return (
    <div className="flex items-center w-full justify-end gap-2">
      <UndoButton />
      <RedoButton />
      <ClearShapes />
    </div>
  );
};

export default CanvasController;

const UndoButton = () => {
  const undo = useDrawingStore((state) => state.undo);
  const historyLength = useDrawingStore((state) => state.history.length);

  return (
    <Button variant="outline" onClick={undo} disabled={historyLength === 0}>
      <Undo className="mr-1" />
      실행 취소
    </Button>
  );
};

const RedoButton = () => {
  const redo = useDrawingStore((state) => state.redo);
  const redoStackLength = useDrawingStore((state) => state.redoStack.length);

  return (
    <Button variant="outline" onClick={redo} disabled={redoStackLength === 0}>
      <Redo className="mr-1" />
      다시 실행
    </Button>
  );
};

const ClearShapes = () => {
  const clearShapes = useDrawingStore((state) => state.clearShapes);

  return (
    <Button variant="outline" onClick={clearShapes}>
      캔버스 초기화
    </Button>
  );
};
