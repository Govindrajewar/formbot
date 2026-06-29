export const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "https://formbot-server-fxza.onrender.com";
export const FRONTEND_URL =
  process.env.REACT_APP_FRONTEND_URL || "https://govindrajewar.github.io/FormBot";

// Builds an absolute, deep-linkable URL that accounts for the GitHub Pages
// subpath (process.env.PUBLIC_URL), e.g. "/form/123" -> ".../FormBot/form/123".
export const buildAppUrl = (path) =>
  `${window.location.origin}${process.env.PUBLIC_URL}${path}`;
