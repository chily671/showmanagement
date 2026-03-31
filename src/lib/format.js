export function formatCurrencyInput(value) {
  const number = value.replace(/\D/g, "");
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function parseCurrency(value) {
  return Number(value.replace(/\./g, ""));
}
