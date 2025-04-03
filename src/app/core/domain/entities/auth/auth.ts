export interface AuthCredentials {
  fullName?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  email: string;
  tokenExpiration: Date;
  messageResponse?: string; 
  
}
