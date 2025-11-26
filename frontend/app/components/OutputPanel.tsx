interface OutputPanelProps {
  analysis: any;
  stitchResult: any;
}

export default function OutputPanel({ analysis, stitchResult }: OutputPanelProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-ghost-green text-glow">
        🔬 Laboratory Results
      </h2>
      
      {!analysis && !stitchResult && (
        <div className="border-2 border-ghost-border bg-ghost-surface p-8 text-center text-gray-500">
          <div className="text-6xl mb-4">⚗️</div>
          <p>Awaiting specimens for analysis...</p>
        </div>
      )}
      
      {analysis && (
        <div className="border-2 border-ghost-green bg-ghost-surface p-4">
          <h3 className="text-lg font-bold text-ghost-green mb-3">
            📊 Analysis Results
          </h3>
          <div className="space-y-3">
            {analysis.map((result: any, idx: number) => (
              <div key={idx} className="bg-ghost-bg p-3 border border-ghost-border">
                <div className="text-ghost-green font-mono text-sm">
                  <div className="mb-2">
                    <span className="text-gray-400">Module {idx + 1}:</span> {result.language}
                  </div>
                  <div className="text-xs space-y-1">
                    <div>Functions: {result.functions?.length || 0}</div>
                    <div>Imports: {result.imports?.length || 0}</div>
                    <div>Exports: {result.exports?.length || 0}</div>
                  </div>
                  {result.functions && result.functions.length > 0 && (
                    <div className="mt-2 text-xs">
                      <div className="text-gray-400">Detected functions:</div>
                      {result.functions.map((fn: any, i: number) => (
                        <div key={i} className="ml-2">
                          • {fn.name}({fn.params.join(', ')})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {stitchResult && (
        <div className="border-2 border-ghost-green bg-ghost-surface p-4 animate-pulse-green">
          <h3 className="text-lg font-bold text-ghost-green mb-3">
            ⚡ {stitchResult.message}
          </h3>
          <div className="bg-ghost-bg p-4 border border-ghost-border">
            <div className="text-ghost-green font-mono text-sm space-y-2">
              <div>
                <span className="text-gray-400">Bridge Type:</span> {stitchResult.bridgeType}
              </div>
              <div>
                <span className="text-gray-400">Files Generated:</span> {Object.keys(stitchResult.stitchedCode || {}).length}
              </div>
              <div>
                <span className="text-gray-400">Glue Code:</span> {stitchResult.glueCode?.length || 0} bridges
              </div>
            </div>
            {stitchResult.compatibility && (
              <div className="mt-3 pt-3 border-t border-ghost-border">
                <div className="text-ghost-green text-sm">
                  <div className="font-bold mb-1">🧵 Compatibility:</div>
                  {stitchResult.compatibility.warnings?.map((warning: string, i: number) => (
                    <div key={i} className="text-yellow-500 text-xs">⚠️ {warning}</div>
                  ))}
                  {stitchResult.compatibility.canStitch && (
                    <div className="text-ghost-green text-xs">✅ All stitches secure!</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
