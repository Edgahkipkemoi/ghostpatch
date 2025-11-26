export default function Header() {
  return (
    <header className="border-b-2 border-ghost-green bg-ghost-surface">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🧟</div>
            <div>
              <h1 className="text-3xl font-bold text-ghost-green text-glow">
                GhostPatch
              </h1>
              <p className="text-gray-400 text-sm">
                The Frankenstein Hybrid Code Generator
              </p>
            </div>
          </div>
          <div className="text-ghost-green animate-pulse-green">
            ⚡
          </div>
        </div>
      </div>
    </header>
  );
}
