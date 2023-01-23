import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(
    path.join(
      dirname(fileURLToPath(import.meta.url)),
      '..',
      'views',
      'index.html'
    )
  );
});

export default router;
