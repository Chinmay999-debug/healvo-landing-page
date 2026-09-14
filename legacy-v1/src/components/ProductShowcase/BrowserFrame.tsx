import type { ReactNode } from "react";
import { Lock } from "lucide-react";

interface BrowserFrameProps {
  currentPath?: string;
  children: ReactNode;
}

export function BrowserFrame({
  currentPath = "/overview",
  children,
}: BrowserFrameProps) {
  return (
    <div className="product-showcase-frame rounded-2xl md:rounded-3xl bg-white border border-[#d8dde4] overflow-hidden">
      {/* Top Browser Chrome */}
      <div className="bg-[#f1f3f7] border-b border-[#e2e6eb] px-4 py-2.5 flex items-center justify-between gap-3 select-none">
        {/* macOS traffic light controls */}
        <div className="flex items-center gap-2 w-14 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]/40" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24]/40" />
          <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]/40" />
        </div>

        {/* Address bar */}
        <div className="flex-1 max-w-sm sm:max-w-md mx-auto">
          <div className="flex items-center justify-center gap-1.5 bg-white border border-[#d8dde4] rounded-lg px-3 py-1 text-[11.5px] sm:text-[12px] text-[#4b5563] shadow-2xs">
            <Lock size={11} className="text-emerald-600 shrink-0" />
            <span className="text-slate-400">https://</span>
            <span className="font-semibold text-[#0f223a]">app.healvo.in</span>
            <span className="text-teal-600 font-medium">{currentPath}</span>
          </div>
        </div>

        {/* Live status badge */}
        <div className="hidden sm:flex items-center gap-1.5 text-[11.5px] font-medium text-[#5b6472] bg-white/70 border border-[#e2e6eb] px-2.5 py-1 rounded-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Sharma Dental</span>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="relative bg-[#0d1b2a] w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
