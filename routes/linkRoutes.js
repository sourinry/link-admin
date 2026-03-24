import express from 'express';
import {
  upsertLink,
  getLinks,
  getLinkByType,
  redirectLink
} from '../controllers/linkController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin protected
router.post('/update', authMiddleware, upsertLink);
router.get('/all', getLinks);

// Public
router.get('/:type', getLinkByType);
router.get('/redirect/:type', redirectLink);

export default router;