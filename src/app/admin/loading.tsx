export default function AdminLoading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="mt-4 text-govt-muted font-medium animate-pulse">Loading admin dashboard...</p>
    </div>
  );
}
