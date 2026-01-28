export default function Columns({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[15%] md:min-h-1/3 lg:h-full flex-1 min-w-60 bg-columns flex-wrap">
      {children}
    </div>
  );
}
