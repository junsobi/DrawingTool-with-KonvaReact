import { PenTool } from 'lucide-react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <header className="p-4 flex items-center gap-2 bg-slate-100 shadow-md border-b text-lg font-semibold">
        <PenTool className="size-6" />
        Drawing App
      </header>
      <main className="flex-grow flex justify-center items-center">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
