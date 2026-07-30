import "./globals.css";

export const metadata = {
  title: "Data Aset PT Multi Daya Investama",
  description:
    "Data aset & penyusutan PT Multi Daya Investama — 300 aset, nilai terkoreksi dan terverifikasi terhadap base data.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
