import MainLayout from '@/layouts/main-layout';
import Canvas from '@/components/canvas';
import ToolPanel from '@/components/tool-panel';

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center gap-4 py-4">
        <Canvas />
        <ToolPanel />
      </div>
    </MainLayout>
  );
}
