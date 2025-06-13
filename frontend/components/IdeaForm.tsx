// frontend/app/components/IdeaForm.tsx

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Komponen sekarang secara eksplisit diketik sebagai React Functional Component
const IdeaForm: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State untuk loading

  // Event handler sekarang diketik dengan benar di dalam TSX
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Judul dan isi tidak boleh kosong.");
      return;
    }
    setIsLoading(true); // Mulai loading

    try {
      const res = await fetch('http://127.0.0.1:8000/api/ideas/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        throw new Error("Gagal mengirim ide ke server.");
      }
      
      setTitle("");
      setContent("");
      router.refresh();

    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan ide.");
    } finally {
      setIsLoading(false); // Selesai loading, baik berhasil maupun gagal
    }
  };

  return (
    // Semua inline style diganti dengan kelas-kelas utility dari Tailwind CSS
    <section className="mb-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Tambah Ide Baru</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Judul Ide Anda"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <textarea
            placeholder="Jelaskan ide Anda di sini..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="w-full md:w-auto self-start px-6 py-3 text-white font-semibold bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Ide'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default IdeaForm;