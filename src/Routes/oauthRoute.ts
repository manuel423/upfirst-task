import { Router } from 'express';
import * as oauthController from '../Controllers/oauthController';

const router = Router();

router.get('/authorize', oauthController.authorize);
router.post('/token', oauthController.token);

export default router;