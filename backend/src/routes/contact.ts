import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// Contact form submission
router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !message) {
            res.status(400).json({ error: 'Name, email, and message are required' });
            return;
        }

        await prisma.contactMessage.create({
            data: { name, email, phone, subject, message },
        });

        console.log('📩 Contact form saved:', { name, email, subject });

        res.status(200).json({
            success: true,
            message: 'Thank you for your message. We will get back to you within 24 hours.',
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit contact form' });
    }
});

export default router;
