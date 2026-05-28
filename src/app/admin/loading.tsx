
export default function AdminLoading() {
  return (
    <div data-component="Admin_loading" className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="mt-4 text-govt-muted font-medium animate-pulse">Loading admin dashboard...</p>
    </div>
  );
}
