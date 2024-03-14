export function generateArtistId() {
  const randomSixDigits = Math.floor(100000 + Math.random() * 900000);

  return randomSixDigits;
}
