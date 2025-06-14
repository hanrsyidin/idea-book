"use client";

import { useRouter } from "next/navigation";
import { Idea } from "../type/index";

// Mendefinisikan tipe untuk props yang diterima komponen ini
type Props = {
  idea: Idea;
};

const IdeaItem: React.FC<Props> = ({ idea }) => {
  const router = useRouter();

  const handleDelete = async () => {
    // Tambahkan konfirmasi sebelum menghapus untuk keamanan
    if (!confirm("Apakah Anda yakin ingin menghapus ide ini?")) {
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/ideas/${idea.id}/`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error("Gagal menghapus ide");
      }

      // Jika berhasil, refresh data di halaman
      router.refresh();

    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menghapus ide.");
    }
  };

  return (
    <li className="bg-white shadow-md rounded-lg p-4 relative">
      <h3 className="text-lg font-bold text-blue-600 mb-2">{idea.title}</h3>
      <p className="text-gray-700 mb-4">{idea.content}</p>
      <div className="flex justify-between items-center">
          <small className="text-gray-500">
            Dibuat pada: {new Date(idea.created_at).toLocaleString('id-ID')}
          </small>
          <button 
            onClick={handleDelete}
            className="px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Hapus
          </button>
      </div>
    </li>
  );
};

export default IdeaItem;