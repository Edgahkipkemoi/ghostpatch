import express from 'express';
import cors from 'cors';
import analysisRoutes from './routes/analysis.js';
import stitchRoutes from './routes/stitch.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/analysis', analysisRoutes);
app.use('/api/stitch', stitchRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: '⚡ The laboratory is operational!' });
});

app.listen(PORT, () => {
  console.log(`⚡ GhostPatch backend alive on port ${PORT}`);
});
