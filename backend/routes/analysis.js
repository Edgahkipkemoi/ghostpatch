import express from 'express';
import { detectLanguage, analyzeCode } from '../services/analyzer.js';

const router = express.Router();

router.post('/detect', async (req, res) => {
  try {
    const { code } = req.body;
    const result = detectLanguage(code);
    res.json({ 
      success: true, 
      message: '🔬 Analysis: Language detected',
      ...result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: `⚡ The lightning strike failed! ${error.message}` 
    });
  }
});

router.post('/ast', async (req, res) => {
  try {
    const { code, language } = req.body;
    const result = await analyzeCode(code, language);
    res.json({ 
      success: true, 
      message: '🔬 Analysis: AST extracted successfully',
      ...result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: `🧟 The dead code refuses to rise! ${error.message}` 
    });
  }
});

export default router;
