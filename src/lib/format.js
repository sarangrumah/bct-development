const idr = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const num = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 });

const tgl = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatIDR(v) {
  return idr.format(v);
}

export function formatNumber(v) {
  return num.format(v);
}

export function formatTanggal(iso) {
  return tgl.format(new Date(iso));
}

export function formatPersen(v) {
  return `${(v * 100).toLocaleString("id-ID", { maximumFractionDigits: 2 })}%`;
}
