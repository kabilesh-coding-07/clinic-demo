import { Router, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// List all services
router.get('/', async (_req, res: Response): Promise<void> => {
    try {
        const services = await prisma.service.findMany();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

// Get service by ID
router.get('/:id', async (req, res: Response): Promise<void> => {
    try {
        const service = await prisma.service.findUnique({
            where: { id: req.params.id },
        });
        if (!service) {
            res.status(404).json({ error: 'Service not found' });
            return;
        }
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch service' });
    }
});

export default router;
