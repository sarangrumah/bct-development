"use client";

import { useMemo, useState } from "react";
import {
  formatIDR,
  formatNumber,
  formatTanggal,
  formatPersen,
} from "@/lib/format";

const PAGE_SIZE = 25;

export default function AssetTable({ assets }) {
  const [q, setQ] = useState("");
  const [kategori, setKategori] = useState("");
  const [page, setPage] = useState(0);

  const kategoriList = useMemo(
    () => [...new Set(assets.map((a) => a.kategori))].sort(),
    [assets]
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return assets.filter((a) => {
      if (kategori && a.kategori !== kategori) return false;
      if (!needle) return true;
      return (
        a.nama.toLowerCase().includes(needle) ||
        a.seri.toLowerCase().includes(needle)
      );
    });
  }, [assets, q, kategori]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const rows = filtered.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE
  );

  const totalFiltered = filtered.reduce((s, a) => s + a.hargaPerolehan, 0);

  return (
    <div>
      <div className="controls">
        <input
          type="search"
          placeholder="Cari nama aset atau nomor seri…"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(0);
          }}
          aria-label="Cari aset"
        />
        <select
          value={kategori}
          onChange={(e) => {
            setKategori(e.target.value);
            setPage(0);
          }}
          aria-label="Saring per kategori"
        >
          <option value="">Semua kategori</option>
          {kategoriList.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th className="num">No</th>
              <th>Nomor Seri</th>
              <th>Nama Aset</th>
              <th>Kategori</th>
              <th>Perolehan</th>
              <th className="num">Masa</th>
              <th className="num">Tarif</th>
              <th className="num">Harga Perolehan</th>
              <th className="num">Akum. 30 Jun 26</th>
              <th className="num">Nilai Buku 30 Jun 26</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.no}>
                <td className="num muted">{a.no}</td>
                <td className="muted">{a.seri}</td>
                <td>
                  {a.nama}{" "}
                  {a.terlewatSummaryLama && (
                    <span className="badge warn">baru</span>
                  )}
                </td>
                <td className="muted">{a.kategori}</td>
                <td className="muted">{formatTanggal(a.tanggalPerolehan)}</td>
                <td className="num muted">{a.masaTahun} th</td>
                <td className="num muted">{formatPersen(a.persenPerTahun)}</td>
                <td className="num">{formatIDR(a.hargaPerolehan)}</td>
                <td className="num">{formatIDR(a.akum20260630)}</td>
                <td className="num">{formatIDR(a.nilaiBuku20260630)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={10} className="muted">
                  Tidak ada aset yang cocok dengan pencarian.
                </td>
              </tr>
            )}
          </tbody>
          {filtered.length > 0 && (
            <tfoot>
              <tr>
                <td colSpan={7}>
                  Total {formatNumber(filtered.length)} aset
                  {kategori ? ` — ${kategori}` : ""}
                </td>
                <td className="num">{formatIDR(totalFiltered)}</td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      <div className="pager">
        <button
          onClick={() => setPage(safePage - 1)}
          disabled={safePage === 0}
        >
          ← Sebelumnya
        </button>
        <span>
          Halaman {safePage + 1} dari {pageCount}
        </span>
        <button
          onClick={() => setPage(safePage + 1)}
          disabled={safePage >= pageCount - 1}
        >
          Berikutnya →
        </button>
      </div>
    </div>
  );
}
