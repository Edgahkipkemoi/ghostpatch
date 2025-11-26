export async function stitchCode(codeBlocks, targetLanguage = 'javascript') {
  const languages = codeBlocks.map(b => b.language);
  const bridgeType = determineBridgeType(languages);
  
  const stitchedCode = {};
  const glueCode = [];
  
  // Generate main entry point
  if (targetLanguage === 'javascript') {
    stitchedCode['index.js'] = generateJavaScriptEntry(codeBlocks, bridgeType);
  }
  
  // Copy original code
  codeBlocks.forEach((block, idx) => {
    const filename = `${block.name || `module_${idx}`}.${getExtension(block.language)}`;
    stitchedCode[`src/${block.language}/${filename}`] = block.code;
  });
  
  // Generate bridge code
  if (bridgeType === 'python-javascript') {
    glueCode.push({
      filename: 'bridges/python_bridge.js',
      code: generatePythonJSBridge(codeBlocks)
    });
  } else if (bridgeType === 'rust-javascript') {
    glueCode.push({
      filename: 'bridges/rust_bridge.js',
      code: generateRustJSBridge(codeBlocks)
    });
  }
  
  const readme = generateReadme(codeBlocks, bridgeType);
  
  return {
    stitchedCode,
    glueCode,
    bridgeType,
    readme,
    compatibility: analyzeCompatibility(codeBlocks)
  };
}

function determineBridgeType(languages) {
  const langSet = new Set(languages);
  
  // Python bridges
  if (langSet.has('python') && (langSet.has('javascript') || langSet.has('typescript'))) {
    return 'python-javascript-ipc';
  }
  if (langSet.has('python') && (langSet.has('cpp') || langSet.has('rust'))) {
    return 'python-native-ffi';
  }
  
  // Rust/C++ bridges
  if (langSet.has('rust') && (langSet.has('javascript') || langSet.has('typescript'))) {
    return 'rust-javascript-wasm';
  }
  if (langSet.has('cpp') && (langSet.has('javascript') || langSet.has('typescript'))) {
    return 'cpp-javascript-wasm';
  }
  
  // Go bridges
  if (langSet.has('go') && (langSet.has('javascript') || langSet.has('typescript'))) {
    return 'go-javascript-wasm';
  }
  
  // JVM languages
  if (langSet.has('java') && (langSet.has('javascript') || langSet.has('typescript'))) {
    return 'java-javascript-rest';
  }
  if (langSet.has('kotlin') && (langSet.has('javascript') || langSet.has('typescript'))) {
    return 'kotlin-javascript-rest';
  }
  
  // .NET languages
  if (langSet.has('csharp') && (langSet.has('javascript') || langSet.has('typescript'))) {
    return 'csharp-javascript-rest';
  }
  
  // Mobile bridges
  if (langSet.has('swift') && langSet.has('kotlin')) {
    return 'swift-kotlin-shared';
  }
  
  // Web languages
  if (langSet.has('php') && (langSet.has('javascript') || langSet.has('typescript'))) {
    return 'php-javascript-rest';
  }
  if (langSet.has('ruby') && (langSet.has('javascript') || langSet.has('typescript'))) {
    return 'ruby-javascript-rest';
  }
  
  return 'native-same-language';
}

function getExtension(language) {
  const extensions = {
    javascript: 'js',
    typescript: 'ts',
    python: 'py',
    rust: 'rs',
    go: 'go'
  };
  return extensions[language] || 'txt';
}

function generateJavaScriptEntry(codeBlocks, bridgeType) {
  return `// GhostPatch - Stitched by Frankenstein
// Bridge Type: ${bridgeType}

${codeBlocks.map((block, idx) => {
  if (block.language === 'javascript' || block.language === 'typescript') {
    return `// Module ${idx + 1}: ${block.name || 'unnamed'}
${block.code}
`;
  }
  return `// External module: ${block.language}`;
}).join('\n\n')}

// Main execution
console.log('⚡ The creature awakens!');
`;
}

function generatePythonJSBridge(codeBlocks) {
  return `// Python-JavaScript Bridge
import { spawn } from 'child_process';

export function ghost_executePython(scriptPath, args = []) {
  return new Promise((resolve, reject) => {
    const python = spawn('python3', [scriptPath, ...args]);
    let output = '';
    let error = '';
    
    python.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    python.stderr.on('data', (data) => {
      error += data.toString();
    });
    
    python.on('close', (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(error));
      }
    });
  });
}
`;
}

function generateRustJSBridge(codeBlocks) {
  return `// Rust-JavaScript Bridge (FFI)
// Note: Requires Rust code to be compiled with cdylib

export function ghost_loadRustModule(wasmPath) {
  // Load WASM module
  return import(wasmPath);
}
`;
}

function analyzeCompatibility(codeBlocks) {
  const compatibility = {
    canStitch: true,
    warnings: [],
    suggestions: []
  };
  
  const languages = codeBlocks.map(b => b.language);
  
  if (languages.includes('rust') && !languages.includes('javascript')) {
    compatibility.warnings.push('Rust requires JavaScript/WASM bridge');
  }
  
  if (languages.includes('go') && !languages.includes('javascript')) {
    compatibility.warnings.push('Go requires JavaScript/WASM bridge');
  }
  
  return compatibility;
}

function generateReadme(codeBlocks, bridgeType) {
  return `# Stitched by GhostPatch

## Languages Combined
${codeBlocks.map(b => `- ${b.language}`).join('\n')}

## Bridge Type
${bridgeType}

## How It Works
This hybrid program uses ${bridgeType} to connect different language modules.

## Build Instructions
\`\`\`bash
npm install
\`\`\`

## Run Instructions
\`\`\`bash
node index.js
\`\`\`
`;
}
