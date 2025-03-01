import Canvas from '@/components/canvas/canvas';
import CanvasController from '@/components/canvas/canvas-controller';
import ToolPanel from '@/components/canvas/tool-panel';
import MainLayout from '@/layouts/main-layout';

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col h-full items-center justify-center gap-2 py-2">
        <CanvasController />
        <ToolPanel />
        <Canvas />
      </div>
    </MainLayout>
  );
}
