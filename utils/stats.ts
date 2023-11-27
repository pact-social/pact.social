export const formatNumber = (nb?: number): string => {
  if (!nb) return '0';
  if (nb < 1e3) return nb.toString()
  if (nb >= 1e3 && nb < 1e6) return +(nb / 1e3).toFixed(1) + "K"
  if (nb >= 1e6 && nb < 1e9) return +(nb / 1e6).toFixed(1) + "M"
  if (nb >= 1e9 && nb < 1e12) return +(nb / 1e9).toFixed(1) + "B"
  if (nb >= 1e12) return +(nb / 1e12).toFixed(1) + "T"
  return nb.toString();
}

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
