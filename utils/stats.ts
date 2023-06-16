export const formatNumber = (nb?: number): string => {
  if (!nb) return '0';

  if (nb > 1000000 ) {
    return `${(nb / 1000000).toFixed(2)}M`;
  }
  if (nb > 1000) {
    return `${(nb / 1000).toFixed(2)}K`;
  }
  return nb.toString();
}
