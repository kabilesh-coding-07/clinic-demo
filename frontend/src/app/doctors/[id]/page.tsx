import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const allDoctors = [
    {
        id: '1', name: 'Dr. Kavitha Rajan', specialty: 'Varmam & Pain Management', exp: 18, img: '👩‍⚕️',
        bio: 'Renowned Varmam specialist with 18 years of experience. Trained under the legendary Varmam guru Sri Ramachandran. Specializes in chronic pain, sports injuries, and neurological conditions.',
        fullBio: 'Dr. Kavitha Rajan is one of South India\'s most respected Varmam practitioners. She trained for 7 years under the legendary Varmam guru Sri Ramachandran in Kanyakumari and has since treated over 10,000 patients with chronic pain conditions. Her expertise in the 108 Varmam points has brought relief to patients suffering from paralysis, frozen shoulder, sciatica, and cervical spondylosis. She combines traditional Varmam techniques with modern physiotherapy principles for optimal results.',
        qualifications: ['BSMS (Bachelor of Siddha Medicine & Surgery)', 'Advanced Varmam Training — Sri Ramachandran School', 'Certified Sports Rehabilitation Specialist', 'Member — Tamil Nadu Siddha Medical Council'],
        specialties: ['Chronic Pain Management', 'Sports Injury Rehabilitation', 'Neurological Conditions', 'Paralysis Recovery', 'Cervical & Lumbar Spondylosis'],
        languages: ['Tamil', 'English', 'Hindi'],
        schedule: 'Mon – Sat, 9:00 AM – 5:00 PM',
    },
    {
        id: '2', name: 'Dr. Senthil Kumar', specialty: 'Herbal Medicine & Internal Medicine', exp: 22, img: '👨‍⚕️',
        bio: '22 years in Siddha herbal medicine. Expert in rare medicinal formulations from ancient texts. Successfully treats complex skin diseases, liver disorders, and auto-immune conditions.',
        fullBio: 'Dr. Senthil Kumar is a master herbalist with 22 years of clinical experience. He has an encyclopedic knowledge of over 500 medicinal plants and their therapeutic applications as documented in ancient Siddha texts like Agathiyar Vaithiyam and Theraiyar Gunavagadam. His rare formulations have successfully treated conditions that conventional medicine found challenging, including chronic psoriasis, liver cirrhosis, and auto-immune disorders. He personally oversees the preparation of all herbal medicines in our pharmacy.',
        qualifications: ['BSMS — Govt. Siddha Medical College, Palayamkottai', 'MD Siddha — National Institute of Siddha', 'Herbal Pharmacology Researcher', 'Published 15+ papers on Siddha formulations'],
        specialties: ['Complex Skin Diseases', 'Liver & Digestive Disorders', 'Auto-immune Conditions', 'Respiratory Issues', 'Rare Herbal Formulations'],
        languages: ['Tamil', 'English'],
        schedule: 'Mon – Fri, 10:00 AM – 6:00 PM',
    },
    {
        id: '3', name: 'Dr. Priya Lakshmi', specialty: 'Women\'s Health & Fertility', exp: 15, img: '👩‍⚕️',
        bio: 'Specialist in women\'s health with focus on PCOS, fertility, and hormonal balance. Has helped 500+ couples achieve pregnancy through natural Siddha treatments.',
        fullBio: 'Dr. Priya Lakshmi has dedicated her 15-year career to women\'s health through the lens of Siddha medicine. She has helped over 500 couples achieve natural conception and has treated thousands of women with PCOS, endometriosis, and hormonal imbalances. Her approach combines traditional Siddha internal medicines with lifestyle modifications, yoga therapy, and dietary guidance. She is known for her compassionate care and thorough understanding of the unique health challenges women face at every life stage.',
        qualifications: ['BSMS — Govt. Siddha Medical College, Chennai', 'Specialization in Maruthuvam (Siddha Internal Medicine)', 'Certified Yoga Therapist', 'Women\'s Health Research Scholar'],
        specialties: ['PCOS & Hormonal Imbalances', 'Fertility Enhancement', 'Menstrual Disorders', 'Menopausal Care', 'Pregnancy Wellness'],
        languages: ['Tamil', 'English', 'Malayalam'],
        schedule: 'Mon – Sat, 9:30 AM – 4:30 PM',
    },
    {
        id: '4', name: 'Dr. Arjun Selvam', specialty: 'Detox & Rejuvenation', exp: 12, img: '👨‍⚕️',
        bio: 'Expert in Panchakarma and Kayakalpa (rejuvenation) therapies. Combines traditional detox methods with modern nutritional science for comprehensive wellness programs.',
        fullBio: 'Dr. Arjun Selvam is a dynamic physician who bridges traditional Siddha detoxification with modern nutritional science. His Panchakarma programs are among the most sought-after in Tamil Nadu, drawing patients from across India and abroad. He specializes in Kayakalpa — the ancient Siddha science of rejuvenation that aims to slow aging and restore vitality. His holistic wellness programs combine therapeutic fasting, herbal detox, medicated oil treatments, and personalized nutrition plans.',
        qualifications: ['BSMS — Sri Sairam Siddha Medical College', 'Advanced Panchakarma Training', 'Certified Nutritional Therapist', 'Kayakalpa Research Fellow'],
        specialties: ['Panchakarma Detoxification', 'Kayakalpa Rejuvenation', 'Weight Management', 'Anti-aging Therapies', 'Corporate Wellness Programs'],
        languages: ['Tamil', 'English', 'Hindi'],
        schedule: 'Tue – Sun, 8:00 AM – 4:00 PM',
    },
    {
        id: '5', name: 'Dr. Meera Thangaraj', specialty: 'Pediatric Siddha Medicine', exp: 14, img: '👩‍⚕️',
        bio: 'Gentle healing for children using safe, natural Siddha remedies. Specializes in childhood allergies, respiratory issues, and developmental support.',
        fullBio: 'Dr. Meera Thangaraj is a compassionate pediatric Siddha specialist who has transformed the health of thousands of children through gentle, natural remedies. With 14 years of experience, she has developed child-friendly formulations that are effective yet pleasant to consume. Her expertise covers childhood allergies, recurrent respiratory infections, growth and developmental issues, ADHD, and digestive problems. Parents trust her for her patient approach and her ability to find natural solutions that avoid the side effects of conventional medications.',
        qualifications: ['BSMS — Govt. Siddha Medical College, Tirunelveli', 'Pediatric Siddha Specialization', 'Child Development Counselor Certification', 'Member — Indian Academy of Pediatric Siddha'],
        specialties: ['Childhood Allergies', 'Respiratory Infections', 'Growth & Development', 'ADHD & Behavioral Issues', 'Digestive Disorders in Children'],
        languages: ['Tamil', 'English'],
        schedule: 'Mon – Sat, 10:00 AM – 5:00 PM',
    },
    {
        id: '6', name: 'Dr. Vijay Anand', specialty: 'Joint & Bone Disorders', exp: 16, img: '👨‍⚕️',
        bio: 'Specialist in musculoskeletal disorders. Combines Varmam therapy with herbal treatments for arthritis, disc problems, and fracture recovery.',
        fullBio: 'Dr. Vijay Anand is a leading Siddha orthopedic specialist whose integrated approach to bone and joint health has saved many patients from surgical intervention. With 16 years of experience, he combines Varmam therapy, Thokkanam massage, Kizhi treatments, and potent internal medicines to treat the most challenging musculoskeletal conditions. His success with rheumatoid arthritis, osteoarthritis, disc prolapse, and sports injuries has earned him a reputation as one of the finest Siddha bone specialists in the region.',
        qualifications: ['BSMS — National Institute of Siddha, Chennai', 'MD Siddha (Sirappu Maruthuvam)', 'Advanced Bone-setting Training', 'Sports Medicine Certificate — NIMHANS'],
        specialties: ['Rheumatoid & Osteo Arthritis', 'Disc Prolapse & Spondylosis', 'Fracture Rehabilitation', 'Sports Injuries', 'Osteoporosis Management'],
        languages: ['Tamil', 'English', 'Kannada'],
        schedule: 'Mon – Fri, 9:00 AM – 5:30 PM',
    },
];

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
    return allDoctors.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const doctor = allDoctors.find((d) => d.id === id);
    return {
        title: doctor ? `${doctor.name} — SiddhaWellness.in` : 'Doctor Not Found',
        description: doctor?.bio,
    };
}

export default async function DoctorDetailPage({ params }: Props) {
    const { id } = await params;
    const doctor = allDoctors.find((d) => d.id === id);

    if (!doctor) return notFound();

    return (
        <>
            {/* Hero */}
            <section className="hero-gradient py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/doctors" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-emerald-300" style={{ color: '#6b8f7e' }}>
                        ← Back to All Doctors
                    </Link>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col items-center md:items-start">
                            <div className="w-36 h-36 rounded-full mb-6 flex items-center justify-center text-7xl animate-float"
                                style={{ background: 'rgba(4,120,87,0.15)', border: '3px solid rgba(4,120,87,0.3)' }}>
                                {doctor.img}
                            </div>
                            <h1 className="font-playfair text-4xl md:text-5xl font-bold gradient-text mb-2">{doctor.name}</h1>
                            <p className="text-lg font-medium mb-1" style={{ color: '#34d399' }}>{doctor.specialty}</p>
                            <p className="text-sm mb-6" style={{ color: '#6b8f7e' }}>{doctor.exp} years of experience</p>
                            <div className="flex flex-wrap gap-3">
                                <div className="glass-card px-4 py-2 text-sm">
                                    <span style={{ color: '#6b8f7e' }}>🗓️ </span>
                                    <span style={{ color: '#a7c4b8' }}>{doctor.schedule}</span>
                                </div>
                                <div className="glass-card px-4 py-2 text-sm">
                                    <span style={{ color: '#6b8f7e' }}>🗣️ </span>
                                    <span style={{ color: '#a7c4b8' }}>{doctor.languages.join(', ')}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="glass-card p-8">
                                <h3 className="font-playfair text-xl font-bold mb-4" style={{ color: '#f0fdf4' }}>Book a Consultation</h3>
                                <p className="text-sm mb-6" style={{ color: '#a7c4b8' }}>
                                    Schedule an appointment with {doctor.name} for personalized Siddha treatment.
                                </p>
                                <Link href="/dashboard/book" className="btn-primary w-full justify-center text-center">
                                    Book Appointment →
                                </Link>
                                <Link href="/contact" className="btn-secondary w-full justify-center text-center mt-3">
                                    Contact the Clinic
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Details */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Bio */}
                        <div className="lg:col-span-2">
                            <h2 className="font-playfair text-2xl font-bold mb-6" style={{ color: '#f0fdf4' }}>About {doctor.name}</h2>
                            <p className="text-base leading-relaxed mb-10" style={{ color: '#a7c4b8' }}>{doctor.fullBio}</p>

                            <h3 className="font-playfair text-xl font-bold mb-5" style={{ color: '#f0fdf4' }}>Areas of Expertise</h3>
                            <div className="grid sm:grid-cols-2 gap-4 mb-10">
                                {doctor.specialties.map((s) => (
                                    <div key={s} className="flex items-center gap-3 p-4 rounded-xl"
                                        style={{ background: 'rgba(4,120,87,0.06)', border: '1px solid rgba(4,120,87,0.1)' }}>
                                        <span className="text-emerald-400 text-lg">✦</span>
                                        <span className="text-sm" style={{ color: '#a7c4b8' }}>{s}</span>
                                    </div>
                                ))}
                            </div>

                            <h3 className="font-playfair text-xl font-bold mb-5" style={{ color: '#f0fdf4' }}>Qualifications</h3>
                            <div className="space-y-3">
                                {doctor.qualifications.map((q) => (
                                    <div key={q} className="flex items-start gap-3 p-4 rounded-xl"
                                        style={{ background: 'rgba(212,160,23,0.04)', border: '1px solid rgba(212,160,23,0.1)' }}>
                                        <span className="text-yellow-500 mt-0.5">🎓</span>
                                        <span className="text-sm" style={{ color: '#a7c4b8' }}>{q}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div>
                            <div className="glass-card p-6 sticky top-28">
                                <h4 className="font-semibold mb-4" style={{ color: '#f0fdf4' }}>Quick Info</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm">
                                        <span>🩺</span>
                                        <div>
                                            <p style={{ color: '#6b8f7e' }}>Specialty</p>
                                            <p className="font-medium" style={{ color: '#34d399' }}>{doctor.specialty}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span>⏳</span>
                                        <div>
                                            <p style={{ color: '#6b8f7e' }}>Experience</p>
                                            <p className="font-medium" style={{ color: '#d4a017' }}>{doctor.exp} years</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span>🗓️</span>
                                        <div>
                                            <p style={{ color: '#6b8f7e' }}>Available</p>
                                            <p className="font-medium" style={{ color: '#a7c4b8' }}>{doctor.schedule}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span>🗣️</span>
                                        <div>
                                            <p style={{ color: '#6b8f7e' }}>Languages</p>
                                            <p className="font-medium" style={{ color: '#a7c4b8' }}>{doctor.languages.join(', ')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(4,120,87,0.15)' }}>
                                    <Link href="/dashboard/book" className="btn-gold w-full justify-center text-center text-sm">
                                        Book with {doctor.name.split(' ')[0]} ✨
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
