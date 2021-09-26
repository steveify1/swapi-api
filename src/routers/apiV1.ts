import { Router } from 'express';
import { movieRouter } from '../components/movie';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'You just hit the v1 API',
    });
});

router.use('/movies', movieRouter);

export default router;