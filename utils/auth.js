export function getToken() {
  return localStorage.getItem("token");
}

export function decodeToken(token) {
  if (!token) return null;

  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
}

export function getCurrentUser() {
  const token = getToken();
  if (!token) return null;

  return decodeToken(token);
}