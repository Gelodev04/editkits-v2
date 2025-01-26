export function calculatePercentage(part, whole) {
  if (whole === 0) {
    throw new Error("The whole value cannot be zero.");
  }
  return (part / whole) * 100;
}