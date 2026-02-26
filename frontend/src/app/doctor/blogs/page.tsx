'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function DoctorBlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        fetch(`${API_URL}/blogs/my`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((r) => r.json())
            .then((data) => { if (Array.isArray(data)) setBlogs(data); })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const deleteBlog = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_URL}/blogs/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                setBlogs((prev) => prev.filter((b) => b.id !== id));
            }
        } catch { /* silently fail */ }
    };

    const togglePublish = async (id: string, published: boolean) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_URL}/blogs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ published: !published }),
            });
            if (res.ok) {
                setBlogs((prev) => prev.map((b) => b.id === id ? { ...b, published: !published } : b));
            }
        } catch { /* silently fail */ }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-playfair text-3xl font-bold gradient-text">Blog Management</h1>
                    <p className="text-sm mt-1" style={{ color: '#6b8f7e' }}>Create, edit, and publish health articles.</p>
                </div>
                <Link href="/doctor/blogs/create"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: 'linear-gradient(135deg, #047857, #065f46)', color: '#f0fdf4' }}>
                    ✍️ New Post
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-20">
                    <span className="text-4xl block mb-4 animate-float">📝</span>
                    <p style={{ color: '#6b8f7e' }}>Loading your posts...</p>
                </div>
            ) : blogs.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <span className="text-6xl block mb-4">📝</span>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#f0fdf4' }}>No Blog Posts Yet</h3>
                    <p className="text-sm mb-6" style={{ color: '#6b8f7e' }}>Share your medical knowledge with patients by creating your first blog post.</p>
                    <Link href="/doctor/blogs/create" className="btn-primary">Create Your First Post →</Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="glass-card p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-semibold" style={{ color: '#f0fdf4' }}>{blog.title}</h3>
                                        <span className="px-2 py-0.5 rounded text-xs font-semibold"
                                            style={{
                                                background: blog.published ? 'rgba(34,197,94,0.15)' : 'rgba(234,179,8,0.15)',
                                                color: blog.published ? '#22c55e' : '#eab308',
                                                border: `1px solid ${blog.published ? 'rgba(34,197,94,0.3)' : 'rgba(234,179,8,0.3)'}`,
                                            }}>
                                            {blog.published ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                    {blog.excerpt && (
                                        <p className="text-sm mb-2" style={{ color: '#a7c4b8' }}>
                                            {blog.excerpt.substring(0, 120)}...
                                        </p>
                                    )}
                                    <p className="text-xs" style={{ color: '#6b8f7e' }}>
                                        Last updated: {new Date(blog.updatedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <button onClick={() => togglePublish(blog.id, blog.published)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                                        style={{
                                            background: blog.published ? 'rgba(234,179,8,0.15)' : 'rgba(34,197,94,0.15)',
                                            color: blog.published ? '#eab308' : '#22c55e',
                                            border: `1px solid ${blog.published ? 'rgba(234,179,8,0.3)' : 'rgba(34,197,94,0.3)'}`,
                                        }}>
                                        {blog.published ? '📥 Unpublish' : '📤 Publish'}
                                    </button>
                                    <Link href={`/doctor/blogs/edit/${blog.id}`}
                                        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                                        style={{ background: 'rgba(4,120,87,0.1)', color: '#34d399', border: '1px solid rgba(4,120,87,0.2)' }}>
                                        ✏️ Edit
                                    </Link>
                                    <button onClick={() => deleteBlog(blog.id)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                                        style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}>
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
