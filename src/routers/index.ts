import { Router } from 'express';
import apiV1 from './apiV1';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Application is running',
    });
});

router.use('/api/v1', apiV1);

export default router;
