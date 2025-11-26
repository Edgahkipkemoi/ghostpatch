import * as babelParser from '@babel/parser';

export function detectLanguage(code) {
  const patterns = {
    // Popular Languages
    python: [/def\s+\w+\s*\(/, /import\s+\w+/, /from\s+\w+\s+import/, /:\s*$/, /print\s*\(/],
    javascript: [/function\s+\w+/, /const\s+\w+\s*=/, /let\s+\w+\s*=/, /=>\s*{/, /console\.log/],
    typescript: [/interface\s+\w+/, /type\s+\w+\s*=/, /:\s*\w+\s*=/, /<\w+>/, /as\s+\w+/],
    java: [/public\s+class/, /private\s+\w+/, /System\.out/, /void\s+\w+/, /import\s+java\./],
    
    // Systems Programming
    cpp: [/#include\s*</, /std::/, /cout\s*<</, /namespace\s+\w+/, /class\s+\w+/],
    c: [/#include\s+</, /int\s+main/, /printf\(/, /malloc\(/, /struct\s+\w+/],
    rust: [/fn\s+\w+/, /let\s+mut/, /impl\s+\w+/, /pub\s+fn/, /::\w+/, /use\s+\w+/],
    go: [/func\s+\w+/, /package\s+\w+/, /import\s+\(/, /fmt\.Print/, /var\s+\w+/],
    
    // .NET Languages
    csharp: [/using\s+System/, /namespace\s+\w+/, /public\s+class/, /Console\.Write/, /var\s+\w+\s*=/],
    fsharp: [/let\s+\w+\s*=/, /match\s+\w+\s+with/, /type\s+\w+\s*=/, /module\s+\w+/],
    vbnet: [/Dim\s+\w+/, /Sub\s+\w+/, /Function\s+\w+/, /Module\s+\w+/],
    
    // Mobile
    swift: [/func\s+\w+/, /var\s+\w+:/, /let\s+\w+:/, /import\s+\w+/, /print\(/],
    kotlin: [/fun\s+\w+/, /val\s+\w+/, /var\s+\w+/, /println\(/, /import\s+\w+/],
    dart: [/void\s+main/, /class\s+\w+/, /var\s+\w+/, /final\s+\w+/, /import\s+'/],
    objectivec: [/@interface/, /@implementation/, /NSLog/, /#import/, /\*\s*\w+;/],
    
    // Web Languages
    php: [/<\?php/, /function\s+\w+/, /echo\s+/, /\$\w+/, /namespace\s+\w+/],
    ruby: [/def\s+\w+/, /end\s*$/, /puts\s+/, /require\s+/, /@\w+/],
    perl: [/sub\s+\w+/, /my\s+\$/, /use\s+\w+/, /print\s+/, /\$\w+/],
    
    // Functional Languages
    haskell: [/module\s+\w+/, /where/, /data\s+\w+/, /type\s+\w+/, /::/],
    scala: [/def\s+\w+/, /val\s+\w+/, /object\s+\w+/, /class\s+\w+/, /trait\s+\w+/],
    elixir: [/defmodule\s+\w+/, /def\s+\w+/, /do\s*$/, /end\s*$/, /|>/],
    erlang: [/-module\(/, /-export\(/, /fun\s+\w+/, /receive/, /end\./],
    clojure: [/\(defn\s+\w+/, /\(def\s+\w+/, /\(ns\s+\w+/, /\(let\s+/],
    
    // Scripting Languages
    lua: [/function\s+\w+/, /local\s+\w+/, /end\s*$/, /require\s+/, /print\(/],
    r: [/function\(/, /<-/, /library\(/, /print\(/, /data\.frame/],
    julia: [/function\s+\w+/, /end\s*$/, /using\s+\w+/, /println\(/, /::/],
    
    // Shell Scripts
    bash: [/#!/, /function\s+\w+/, /echo\s+/, /if\s+\[/, /fi\s*$/],
    powershell: [/function\s+\w+/, /\$\w+/, /Write-Host/, /param\(/, /Get-\w+/],
    
    // Data & Query Languages
    sql: [/SELECT\s+/, /FROM\s+/, /WHERE\s+/, /INSERT\s+INTO/, /CREATE\s+TABLE/],
    graphql: [/type\s+\w+/, /query\s+\w+/, /mutation\s+\w+/, /schema\s*{/],
    
    // Markup & Config
    html: [/<html/, /<div/, /<body/, /<head/, /<script/],
    css: [/\{[^}]*\}/, /\.\w+\s*{/, /#\w+\s*{/, /@media/],
    json: [/^\s*{/, /"[\w-]+"\s*:/, /\[\s*{/],
    yaml: [/^[\w-]+:/, /^\s+-\s+/, /^---/],
    xml: [/<\?xml/, /<\w+>/, /<\/\w+>/]
  };

  const scores = {};
  for (const [lang, regexes] of Object.entries(patterns)) {
    scores[lang] = regexes.filter(regex => regex.test(code)).length;
  }

  const detected = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  const confidence = detected[1] / Math.max(...Object.values(scores), 1);

  return {
    language: detected[0],
    confidence: Math.min(confidence, 1.0)
  };
}

export async function analyzeCode(code, language) {
  const analysis = {
    language,
    functions: [],
    types: [],
    imports: [],
    exports: []
  };

  try {
    if (language === 'javascript' || language === 'typescript') {
      const ast = babelParser.parse(code, {
        sourceType: 'module',
        plugins: ['typescript', 'jsx']
      });

      // Extract functions
      ast.program.body.forEach(node => {
        if (node.type === 'FunctionDeclaration') {
          analysis.functions.push({
            name: node.id.name,
            params: node.params.map(p => p.name || 'unknown'),
            line: node.loc.start.line
          });
        }
        if (node.type === 'VariableDeclaration') {
          node.declarations.forEach(decl => {
            if (decl.init && (decl.init.type === 'ArrowFunctionExpression' || decl.init.type === 'FunctionExpression')) {
              analysis.functions.push({
                name: decl.id.name,
                params: decl.init.params.map(p => p.name || 'unknown'),
                line: decl.loc.start.line
              });
            }
          });
        }
        if (node.type === 'ImportDeclaration') {
          analysis.imports.push(node.source.value);
        }
        if (node.type === 'ExportNamedDeclaration' || node.type === 'ExportDefaultDeclaration') {
          analysis.exports.push(node.declaration?.name || 'default');
        }
      });
    } else if (language === 'python') {
      // Simple Python parsing
      const lines = code.split('\n');
      lines.forEach((line, idx) => {
        const funcMatch = line.match(/def\s+(\w+)\s*\((.*?)\)/);
        if (funcMatch) {
          analysis.functions.push({
            name: funcMatch[1],
            params: funcMatch[2].split(',').map(p => p.trim()).filter(Boolean),
            line: idx + 1
          });
        }
        const importMatch = line.match(/(?:from\s+\w+\s+)?import\s+([\w,\s]+)/);
        if (importMatch) {
          analysis.imports.push(importMatch[1].trim());
        }
      });
    } else if (language === 'rust') {
      // Simple Rust parsing
      const lines = code.split('\n');
      lines.forEach((line, idx) => {
        const funcMatch = line.match(/fn\s+(\w+)\s*\((.*?)\)/);
        if (funcMatch) {
          analysis.functions.push({
            name: funcMatch[1],
            params: funcMatch[2].split(',').map(p => p.trim().split(':')[0]).filter(Boolean),
            line: idx + 1
          });
        }
      });
    } else if (language === 'go') {
      // Simple Go parsing
      const lines = code.split('\n');
      lines.forEach((line, idx) => {
        const funcMatch = line.match(/func\s+(\w+)\s*\((.*?)\)/);
        if (funcMatch) {
          analysis.functions.push({
            name: funcMatch[1],
            params: funcMatch[2].split(',').map(p => p.trim().split(' ')[0]).filter(Boolean),
            line: idx + 1
          });
        }
      });
    }
  } catch (error) {
    throw new Error(`Parse error: ${error.message}`);
  }

  return analysis;
}
