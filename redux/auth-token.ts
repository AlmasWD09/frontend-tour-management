export function saveAccessToken(token: string) {
  document.cookie = `token=${encodeURIComponent(token)}; Path=/; SameSite=Lax`;
}
