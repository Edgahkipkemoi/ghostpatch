import { spawn } from 'child_process';

export async function executeSandbox(code, language, timeout = 5000) {
  return new Promise((resolve, reject) => {
    let command, args;
    
    switch (language) {
      case 'javascript':
      case 'typescript':
        command = 'node';
        args = ['-e', code];
        break;
      case 'python':
        command = 'python3';
        args = ['-c', code];
        break;
      default:
        return reject(new Error(`Unsupported language: ${language}`));
    }
    
    const process = spawn(command, args);
    let stdout = '';
    let stderr = '';
    
    const timer = setTimeout(() => {
      process.kill();
      reject(new Error('Execution timeout'));
    }, timeout);
    
    process.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    process.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    process.on('close', (code) => {
      clearTimeout(timer);
      resolve({
        stdout,
        stderr,
        exitCode: code
      });
    });
    
    process.on('error', (error) => {
      clearTimeout(timer);
      reject(error);
    });
  });
}
