declare module 'express-session' {
  interface SessionData {
    user: {
      id: number;
      role: string;
    };
  }
}

export {};