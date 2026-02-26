import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌿 Seeding SiddhaWellness database...');

    // Clear existing data
    await prisma.appointment.deleteMany();
    await prisma.doctor.deleteMany();
    await prisma.blog.deleteMany();
    await prisma.service.deleteMany();
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash('password123', 12);

    // ── Test Patient ──
    const patient = await prisma.user.create({
        data: {
            email: 'patient@test.com',
            name: 'Ramya Sundaram',
            password: hashedPassword,
            phone: '+91 98765 43210',
            role: 'USER',
        },
    });
    console.log('  ✅ Test patient: patient@test.com / password123');

    // ── Admin ──
    await prisma.user.create({
        data: {
            email: 'admin@siddha.in',
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });
    console.log('  ✅ Admin: admin@siddha.in / password123');

    // ── Doctors ──
    const doctorData = [
        { email: 'kavitha@siddha.in', name: 'Dr. Kavitha Rajan', specialty: 'Varmam & Pain Management', exp: 18, bio: 'Renowned Varmam specialist with 18 years of experience. Trained under the legendary Varmam guru Sri Ramachandran.' },
        { email: 'senthil@siddha.in', name: 'Dr. Senthil Kumar', specialty: 'Herbal Medicine & Internal Medicine', exp: 22, bio: '22 years in Siddha herbal medicine. Expert in rare medicinal formulations from ancient texts.' },
        { email: 'priya@siddha.in', name: 'Dr. Priya Lakshmi', specialty: "Women's Health & Fertility", exp: 15, bio: "Specialist in women's health with focus on PCOS, fertility, and hormonal balance." },
        { email: 'arjun@siddha.in', name: 'Dr. Arjun Selvam', specialty: 'Detox & Rejuvenation', exp: 12, bio: 'Expert in Panchakarma and Kayakalpa (rejuvenation) therapies.' },
        { email: 'meera@siddha.in', name: 'Dr. Meera Thangaraj', specialty: 'Pediatric Siddha Medicine', exp: 14, bio: 'Gentle healing for children using safe, natural Siddha remedies.' },
        { email: 'vijay@siddha.in', name: 'Dr. Vijay Anand', specialty: 'Joint & Bone Disorders', exp: 16, bio: 'Specialist in musculoskeletal disorders combining Varmam therapy with herbal treatments.' },
    ];

    for (const d of doctorData) {
        const user = await prisma.user.create({
            data: {
                email: d.email,
                name: d.name,
                password: hashedPassword,
                role: 'DOCTOR',
            },
        });
        await prisma.doctor.create({
            data: {
                userId: user.id,
                specialty: d.specialty,
                experience: d.exp,
                bio: d.bio,
                availability: JSON.stringify({
                    monday: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
                    tuesday: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
                    wednesday: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
                    thursday: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
                    friday: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
                    saturday: ['09:00 AM', '10:00 AM', '11:00 AM'],
                }),
            },
        });
    }
    console.log('  ✅ 6 doctors seeded');

    // ── Services ──
    const services = [
        { name: 'Herbal Medicine', icon: '🌿', description: 'Customized herbal formulations prepared from rare medicinal plants following ancient Siddha texts.', price: 500, duration: '30–45 min', featured: true },
        { name: 'Varmam Therapy', icon: '🤲', description: 'Ancient pressure-point healing technique targeting 108 vital energy points.', price: 1500, duration: '45–60 min', featured: true },
        { name: 'Yoga & Pranayama', icon: '🧘', description: 'Traditional yoga practices designed using Siddha medical principles.', price: 800, duration: '60 min', featured: true },
        { name: 'Panchakarma Detox', icon: '🍃', description: 'Five-step deep cleansing therapy to eliminate accumulated toxins.', price: 5000, duration: '5–21 day program', featured: true },
        { name: 'Diet & Nutrition Therapy', icon: '🥗', description: 'Personalized Pathya (diet) plans based on your body constitution.', price: 1000, duration: '45 min', featured: false },
        { name: 'Thokkanam (Oil Therapy)', icon: '💆', description: 'Traditional Siddha massage with medicated herbal oils.', price: 2000, duration: '60–90 min', featured: false },
        { name: "Women's Health", icon: '🌸', description: 'Specialized treatments for PCOS, menstrual disorders, and fertility.', price: 1000, duration: '45 min', featured: false },
        { name: 'Skin & Hair Care', icon: '🧪', description: 'Natural treatments for eczema, psoriasis, acne, and hair fall.', price: 1000, duration: '30–45 min', featured: false },
        { name: 'Joint & Bone Care', icon: '🦴', description: 'Effective Siddha treatments for arthritis, spine disorders, and fractures.', price: 1500, duration: '45–60 min', featured: false },
    ];

    for (const s of services) {
        await prisma.service.create({ data: s });
    }
    console.log('  ✅ 9 services seeded');

    // ── Blog Posts ──
    const blogs = [
        {
            title: 'Understanding Siddha Medicine: A Complete Guide',
            slug: 'understanding-siddha-medicine',
            excerpt: 'Discover the ancient Tamil medical system that has been healing people for over 5000 years.',
            content: 'Siddha medicine is one of the oldest traditional medical systems in the world, originating in ancient Tamil Nadu. It was developed by the 18 Siddhars — enlightened sages who achieved perfection in mind, body, and spirit.\n\nThe fundamental principle of Siddha medicine is the balance of three humors: Vatham (wind), Pitham (fire), and Kabam (water/earth). Disease occurs when these humors are imbalanced, and treatment aims to restore equilibrium through herbal medicines, dietary modifications, yoga, and external therapies.\n\nUnlike modern medicine that treats symptoms, Siddha medicine addresses the root cause of disease. It considers the whole person — physical constitution, mental state, lifestyle, and environment — when prescribing treatment.',
            published: true,
        },
        {
            title: '5 Herbs Every Kitchen Should Have',
            slug: '5-herbs-for-kitchen',
            excerpt: 'These common herbs used in Siddha medicine can boost your immunity and wellbeing daily.',
            content: 'According to Siddha medicine, your kitchen is your first pharmacy. Here are five powerful herbs that every household should have:\n\n1. **Turmeric (Manjal)** — A powerful anti-inflammatory and antioxidant. Add to warm milk daily for immunity.\n\n2. **Holy Basil (Thulasi)** — Excellent for respiratory health, stress relief, and blood sugar regulation.\n\n3. **Ginger (Inji)** — Aids digestion, reduces nausea, and fights cold and flu symptoms.\n\n4. **Neem (Vembu)** — Nature\'s antibiotic. Purifies blood, treats skin conditions, and boosts immunity.\n\n5. **Ashwagandha (Amukkara)** — An adaptogenic herb that reduces stress, improves energy, and enhances cognitive function.',
            published: true,
        },
        {
            title: 'Varmam Therapy: Ancient Pressure Points',
            slug: 'varmam-therapy-guide',
            excerpt: 'Learn how this powerful Siddha technique uses 108 vital points to heal chronic conditions.',
            content: 'Varmam therapy is one of the most remarkable healing arts in Siddha medicine. It involves the precise application of pressure on 108 vital energy points (varmam) distributed throughout the body.\n\nThese points are junctions where nerves, muscles, bones, and energy channels intersect. When stimulated correctly, they can unblock energy flow, restore nerve function, and activate the body\'s natural healing mechanisms.\n\nVarmam therapy is particularly effective for:\n- Chronic pain conditions\n- Paralysis and nerve damage\n- Sports injuries\n- Cervical and lumbar spondylosis\n- Frozen shoulder\n\nA trained Varmam practitioner can often achieve dramatic results even from the first session.',
            published: true,
        },
    ];

    for (const b of blogs) {
        await prisma.blog.create({ data: b });
    }
    console.log('  ✅ 3 blog posts seeded');

    // ── Sample Appointment ──
    const firstDoctor = await prisma.doctor.findFirst();
    if (firstDoctor) {
        await prisma.appointment.create({
            data: {
                userId: patient.id,
                doctorId: firstDoctor.id,
                date: new Date('2026-03-05'),
                time: '10:00 AM',
                status: 'CONFIRMED',
                symptoms: 'Chronic lower back pain for the past 3 months',
            },
        });
        console.log('  ✅ 1 sample appointment seeded');
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Test Accounts:');
    console.log('   Patient: patient@test.com / password123');
    console.log('   Doctor:  kavitha@siddha.in / password123');
    console.log('   Admin:   admin@siddha.in / password123');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
