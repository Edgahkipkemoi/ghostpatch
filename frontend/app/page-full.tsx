'use client';

import { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import OutputPanel from './components/OutputPanel';
import Header from './components/Header';

export default function Home() {
  const [codeBlocks, setCodeBlocks] = useState([{ id: 1, code: '', language: 'javascript', name: 'module1' }]);
  const [analysis, setAnalysis] = useState<any[] | null>(null);
  const [stitchResult, setStitchResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const addCodeBlock = () => {
    setCodeBlocks([...codeBlocks, { 
      id: Date.now(), 
      code: '', 
      language: 'javascript', 
      name: `module${codeBlocks.length + 1}` 
    }]);
  };

  const updateCodeBlock = (id: number, updates: any) => {
    setCodeBlocks(codeBlocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    ));
  };

  const removeCodeBlock = (id: number) => {
    if (codeBlocks.length > 1) {
      setCodeBlocks(codeBlocks.filter(block => block.id !== id));
    }
  };

  const analyzeCode = async () => {
    setLoading(true);
    try {
      const results = await Promise.all(
        codeBlocks.map(async (block) => {
          const res = await fetch('http://localhost:3001/api/analysis/ast', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: block.code, language: block.language })
          });
          return res.json();
        })
      );
      setAnalysis(results);
    } catch (error) {
      console.error('Analysis failed:', error);
    }
    setLoading(false);
  };

  const stitchCode = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/stitch/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codeBlocks, targetLanguage: 'javascript' })
      });
      const result = await res.json();
      setStitchResult(result);
    } catch (error) {
      console.error('Stitching failed:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-ghost-bg">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-ghost-green text-glow">
                🧪 Code Specimens
              </h2>
              <button
                onClick={addCodeBlock}
                className="px-4 py-2 bg-ghost-surface border-2 border-ghost-green text-ghost-green hover:glow-green transition-all"
              >
                ➕ Add Specimen
              </button>
            </div>
            
            {codeBlocks.map((block) => (
              <CodeEditor
                key={block.id}
                block={block}
                onUpdate={(updates) => updateCodeBlock(block.id, updates)}
                onRemove={() => removeCodeBlock(block.id)}
              />
            ))}
            
            <div className="flex gap-4">
              <button
                onClick={analyzeCode}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-ghost-surface border-2 border-ghost-green text-ghost-green hover:glow-green transition-all disabled:opacity-50"
              >
                {loading ? '🔬 Examining...' : '🔬 Analyze Code'}
              </button>
              <button
                onClick={stitchCode}
                disabled={loading || !analysis}
                className="flex-1 px-6 py-3 bg-ghost-green text-ghost-dark font-bold hover:bg-ghost-neon transition-all disabled:opacity-50"
              >
                {loading ? '⚡ Stitching...' : '⚡ Stitch Together'}
              </button>
            </div>
          </div>
          
          <OutputPanel analysis={analysis} stitchResult={stitchResult} />
        </div>
      </main>
    </div>
  );
}
