import express from 'express';
import { stitchCode } from '../services/stitcher.js';
import { executeSandbox } from '../services/sandbox.js';
import { generateZip } from '../services/exporter.js';

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const { codeBlocks, targetLanguage } = req.body;
    const result = await stitchCode(codeBlocks, targetLanguage);
    res.json({ 
      success: true, 
      message: '⚡ It\'s alive! Code successfully stitched together',
      ...result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: `🔩 The stitches won't hold! ${error.message}` 
    });
  }
});

router.post('/execute', async (req, res) => {
  try {
    const { code, language } = req.body;
    const result = await executeSandbox(code, language);
    res.json({ 
      success: true, 
      message: '⚰️ Risen from the dead! Code execution successful',
      ...result 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: `⚠️ The creature is unstable! ${error.message}` 
    });
  }
});

router.post('/export', async (req, res) => {
  try {
    const { projectStructure, projectName } = req.body;
    const zipBuffer = await generateZip(projectStructure, projectName);
    
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${projectName}.zip"`);
    res.send(zipBuffer);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: `⚡ Power surge detected! ${error.message}` 
    });
  }
});

export default router;
