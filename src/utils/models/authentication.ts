export interface Authentication {
  authority: string;
  redirectUri: string;
  silentRedirectUri: string;
  logoutRedirectUri: string;
  client_id: string;
  response_type: string;
  scope: string;
}
