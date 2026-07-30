import data from "@/data/assets.json";
import AssetTable from "@/components/AssetTable";
import { formatIDR, formatNumber } from "@/lib/format";

export default function Home() {
  const { meta, kategori, assets } = data;
  const maxKategori = Math.max(...kategori.map((k) => k.hargaPerolehan));

  return (
    <main>
      <header className="page-header">
        <h1>Data Aset &amp; Penyusutan — {meta.perusahaan}</h1>
        <p>
          {meta.sumber} · metode garis lurus, prorata bulanan sejak bulan
          perolehan{" "}
          <span className="badge good">
            ✓ Terkoreksi — selisih {formatIDR(meta.selisihSummaryLama)} sudah
            dimasukkan
          </span>
        </p>
      </header>

      <div className="tiles">
        <div className="tile">
          <div className="label">Jumlah Aset</div>
          <div className="value">{formatNumber(meta.jumlahAset)}</div>
          <div className="sub">Seluruh aset tercatat aktif</div>
        </div>
        <div className="tile">
          <div className="label">Total Harga Perolehan</div>
          <div className="value">{formatIDR(meta.totalHargaPerolehan)}</div>
          <div className="sub">
            Summary lama: {formatIDR(meta.totalSummaryLama)} (kurang{" "}
            {formatIDR(meta.selisihSummaryLama)})
          </div>
        </div>
        <div className="tile">
          <div className="label">Akumulasi Penyusutan · 30 Jun 2026</div>
          <div className="value">{formatIDR(meta.totalAkum20260630)}</div>
          <div className="sub">Cut-off pelaporan Juni 2026</div>
        </div>
        <div className="tile">
          <div className="label">Nilai Buku · 30 Jun 2026</div>
          <div className="value">{formatIDR(meta.totalNilaiBuku20260630)}</div>
          <div className="sub">
            Per 31 Jul 2026: {formatIDR(meta.totalNilaiBuku20260731)}
          </div>
        </div>
      </div>

      <section>
        <h2>Ringkasan per Kategori</h2>
        <p className="section-sub">
          Harga perolehan, akumulasi penyusutan, dan nilai buku per 30 Juni
          2026. Kategori bertanda{" "}
          <span className="badge warn">baru</span> berisi 5 aset yang terlewat
          dari summary lama di gsheet.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Kategori</th>
                <th className="num">Aset</th>
                <th className="num">Harga Perolehan</th>
                <th aria-hidden="true"></th>
                <th className="num">Akum. Penyusutan</th>
                <th className="num">Nilai Buku</th>
              </tr>
            </thead>
            <tbody>
              {kategori.map((k) => (
                <tr key={k.kategori}>
                  <td>
                    {k.kategori}{" "}
                    {k.terlewatSummaryLama && (
                      <span className="badge warn">baru</span>
                    )}
                  </td>
                  <td className="num">{formatNumber(k.jumlahAset)}</td>
                  <td className="num">{formatIDR(k.hargaPerolehan)}</td>
                  <td>
                    <div
                      className="bar-track"
                      role="img"
                      aria-label={`${k.kategori}: ${formatIDR(k.hargaPerolehan)}`}
                    >
                      <div
                        className="bar-fill"
                        style={{
                          width: `${Math.max(
                            1,
                            (k.hargaPerolehan / maxKategori) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </td>
                  <td className="num">{formatIDR(k.akum20260630)}</td>
                  <td className="num">{formatIDR(k.nilaiBuku20260630)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td className="num">{formatNumber(meta.jumlahAset)}</td>
                <td className="num">{formatIDR(meta.totalHargaPerolehan)}</td>
                <td></td>
                <td className="num">{formatIDR(meta.totalAkum20260630)}</td>
                <td className="num">{formatIDR(meta.totalNilaiBuku20260630)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <section>
        <h2>Daftar Aset</h2>
        <p className="section-sub">
          {formatNumber(meta.jumlahAset)} aset — cari berdasarkan nama/nomor
          seri, atau saring per kategori.
        </p>
        <AssetTable assets={assets} />
        <p className="footnote">
          Nilai buku dihitung garis lurus prorata bulanan sejak bulan perolehan
          (konvensi yang sama dengan tabel penyusutan gsheet; 58 aset umur 4
          tahun yang di summary lama sudah Rp0 masih menyisakan nilai buku s.d.
          jatuh tempo bulan ke-48).
        </p>
      </section>
    </main>
  );
}
