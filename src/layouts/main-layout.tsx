const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <header className="p-4 bg-white shadow-md">Drawing Tool</header>
      <main className="flex-grow flex justify-center items-center">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
