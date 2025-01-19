'use client';
import dynamic from 'next/dynamic';

const CanvasComponent = dynamic(() => import('./canvas-component'), {
  ssr: false,
});

const Canvas = () => {
  return <CanvasComponent />;
};

export default Canvas;
