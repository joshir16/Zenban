export default function Columns({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:h-1/3 lg:h-full flex-1 min-w-60 bg-columns flex-wrap">
      {children}
    </div>
  );
}
