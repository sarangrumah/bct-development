# BCT Development — Data Aset PT Multi Daya Investama

Dashboard data aset & penyusutan PT Multi Daya Investama (300 aset, total harga
perolehan Rp86.162.471.019) dengan nilai **terkoreksi** — termasuk 5 aset senilai
Rp1.394.112.695 yang terlewat dari summary gsheet lama.

## Sumber data

- Base data: gsheet "Komersil - Penyusutan Aset" (diverifikasi 30 Jul 2026 —
  2.188 sel penyusutan dihitung ulang, 0 selisih).
- Data statis di [`src/data/assets.json`](src/data/assets.json), dihasilkan dari
  base data tersebut. Konvensi: garis lurus, prorata bulanan sejak bulan perolehan.
- Cut-off tersedia: 31 Des 2025, 30 Jun 2026, 31 Jul 2026.

## Menjalankan

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # produksi
```

## Deploy ke Vercel

Repo ini siap deploy tanpa konfigurasi tambahan (Next.js App Router, data
statis, tanpa env var):

1. Buka [vercel.com/new](https://vercel.com/new), impor repo
   `sarangrumah/bct-development`.
2. Framework terdeteksi otomatis sebagai Next.js — langsung **Deploy**.

Setiap push ke `main` akan otomatis ter-deploy ulang.
