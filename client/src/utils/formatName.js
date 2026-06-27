export function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function getFirstName(fullName) {
  if (!fullName) return "";
  return capitalize(fullName.trim().split(" ")[0]);
}
