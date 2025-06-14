import IdeaForm from "@/components/IdeaForm";
import IdeaItem from "@/components/IdeaItem";
import { Idea } from "../type/index";

// Mendefinisikan tipe untuk props yang diterima komponen ini
type Props = {
  idea: Idea;
};

// Fungsi ini akan berjalan di sisi server untuk mengambil data
// Beritahu fungsi getIdeas bahwa ia akan mengembalikan array dari Idea
// Tambahkan tipe kembalian: Promise<Idea[]>
async function getIdeas(): Promise<Idea[]> {
  // Kita panggil API Django kita yang berjalan di port 8000
  // `cache: 'no-store'` penting agar kita selalu mendapatkan data terbaru
  const res = await fetch('http://127.0.0.1:8000/api/ideas/', { cache: 'no-store' });

  // Jika respons tidak OK (misalnya server Django mati), tampilkan error
  if (!res.ok) {
    throw new Error('Gagal mengambil data dari API Django');
  }

  return res.json();
}

// Ini adalah komponen halaman utama kita
export default async function Home() {
  // Panggil fungsi getIdeas dan tunggu datanya datang
  const ideas = await getIdeas();

  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto', padding: '2rem' }}>
      <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#333' }}>Buku Ide 💡</h1>
        <p style={{ color: '#666' }}>Semua ide brilian Anda, di satu tempat.</p>
      </header>

      <IdeaForm />

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Daftar Ide</h2>

        {ideas.length === 0 && (
          <p className="text-gray-500 italic">Belum ada ide. Jadilah yang pertama!</p>
        )}

        {/* Gunakan komponen IdeaItem di sini */}
        <ul className="space-y-4">
          {ideas.map((idea) => (
            <IdeaItem key={idea.id} idea={idea} />
          ))}
        </ul>
      </section>
    </main>
  );
}