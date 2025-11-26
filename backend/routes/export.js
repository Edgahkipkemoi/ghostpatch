const express = require('express');
const router = express.Router();
const { generateZip } = require('../services/exporter');

// Generate and download zip
router.post('/zip', async (req, res) => {
  try {
    const { projectName, files, readme } = req.body;
    
    if (!files || !projectName) {
      return res.status(400).json({ 
        error: '⚡ The lightning strike failed! Project name and files required' 
      });
    }

    const zipBuffer = await generateZip(projectName, files, readme);
    
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${projectName}.zip"`);
    res.send(zipBuffer);
  } catch (error) {
    res.status(500).json({ 
      error: `⚰️ Export failed! ${error.message}` 
    });
  }
});

module.exports = router;
