import { Router } from 'express';
import { characterRouter } from '../components/character';
import { movieRouter } from '../components/movie';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'You have reached the v1 API',
    });
});

router.use('/movies', movieRouter);
router.use('/characters', characterRouter);

export default router;
