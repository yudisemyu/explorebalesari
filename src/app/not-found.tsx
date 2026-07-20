import Link from "next/link";
import { TreePine, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
        <TreePine className="h-10 w-10" />
      </div>

      <h1 className="text-7xl font-bold tracking-tighter text-foreground">404</h1>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
        Halaman Tidak Ditemukan
      </h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        Maaf, halaman yang Anda cari tidak ditemukan. Mungkin halaman ini sudah dipindahkan atau dihapus.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Beranda
      </Link>
    </div>
  );
}
