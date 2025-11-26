const express = require('express');
const router = express.Router();
const { executeCode } = require('../services/sandbox');

// Execute code in sandbox
router.post('/execute', async (req, res) => {
  try {
    const { code, language, timeout = 5000 } = req.body;
    
    if (!code || !language) {
      return res.status(400).json({ 
        error: '⚡ The lightning strike failed! Code and language required' 
      });
    }

    const result = await executeCode(code, language, timeout);
    res.json({
      message: '⚰️ Risen from the dead! Code execution successful',
      ...result
    });
  } catch (error) {
    res.status(500).json({ 
      error: `⚠️ The creature is unstable! ${error.message}` 
    });
  }
});

module.exports = router;
