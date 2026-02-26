import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import { authenticate, AuthRequest, requireRole } from '../middleware/auth';

const router = Router();

// List all doctors (public)
router.get('/', async (_req, res: Response): Promise<void> => {
    try {
        const doctors = await prisma.doctor.findMany({
            include: { user: { select: { name: true, email: true, image: true } } },
        });
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch doctors' });
    }
});

// Get doctor profile (for logged-in doctor) — MUST be before /:id
router.get('/me/profile', authenticate, requireRole('DOCTOR'), async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const doctor = await prisma.doctor.findUnique({
            where: { userId: req.userId },
            include: { user: { select: { name: true, email: true, image: true, phone: true } } },
        });
        if (!doctor) {
            res.status(404).json({ error: 'Doctor profile not found' });
            return;
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Get doctor by ID (public)
router.get('/:id', async (req, res: Response): Promise<void> => {
    try {
        const doctor = await prisma.doctor.findUnique({
            where: { id: req.params.id },
            include: { user: { select: { name: true, email: true, image: true } } },
        });
        if (!doctor) {
            res.status(404).json({ error: 'Doctor not found' });
            return;
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch doctor' });
    }
});

// Update availability (doctor only)
router.put('/availability', authenticate, requireRole('DOCTOR'), async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { availability } = req.body;
        const doctor = await prisma.doctor.update({
            where: { userId: req.userId },
            data: { availability },
        });
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update availability' });
    }
});

export default router;
