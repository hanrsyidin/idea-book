import IdeaForm from "@/components/IdeaForm";

interface Idea {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

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

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#333' }}>Daftar Ide</h2>
        
        {/* Jika tidak ada ide, tampilkan pesan */}
        {ideas.length === 0 && (
          <p style={{ color: '#888', fontStyle: 'italic' }}>Belum ada ide. Jadilah yang pertama!</p>
        )}

        {/* Jika ada ide, tampilkan dalam bentuk daftar */}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {ideas.map((idea) => (
            <li key={idea.id} style={{ background: '#f9f9f9', border: '1px solid #eee', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#0070f3' }}>{idea.title}</h3>
              <p style={{ margin: 0, color: '#444' }}>{idea.content}</p>
              <small style={{ display: 'block', marginTop: '1rem', color: '#999' }}>
                Dibuat pada: {new Date(idea.created_at).toLocaleString('id-ID')}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}