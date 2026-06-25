// Decodes a JWT payload for display purposes only - this is not a security
// boundary, the server independently verifies the token on every request.
export const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    return null;
  }
};
