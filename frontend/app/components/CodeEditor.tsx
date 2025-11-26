interface CodeEditorProps {
  block: any;
  onUpdate: (updates: any) => void;
  onRemove: () => void;
}

export default function CodeEditor({ block, onUpdate, onRemove }: CodeEditorProps) {
  return (
    <div className="border-2 border-ghost-green bg-ghost-surface p-4 stitched-border">
      <div className="flex justify-between items-center mb-3">
        <input
          type="text"
          value={block.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="bg-ghost-bg border border-ghost-border text-ghost-green px-3 py-1 focus:outline-none focus:border-ghost-green"
          placeholder="Module name"
        />
        <div className="flex gap-2 items-center">
          <select
            value={block.language}
            onChange={(e) => onUpdate({ language: e.target.value })}
            className="bg-ghost-bg border border-ghost-border text-ghost-green px-3 py-1 focus:outline-none focus:border-ghost-green"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="rust">Rust</option>
            <option value="go">Go</option>
          </select>
          <button
            onClick={onRemove}
            className="px-3 py-1 text-red-500 hover:text-red-400"
          >
            🗑️
          </button>
        </div>
      </div>
      <div className="border border-ghost-border">
        <textarea
          value={block.code}
          onChange={(e) => onUpdate({ code: e.target.value })}
          className="w-full h-48 bg-ghost-bg text-ghost-green font-mono text-sm p-4 focus:outline-none focus:border-ghost-green resize-none"
          placeholder={`Enter ${block.language} code here...`}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
