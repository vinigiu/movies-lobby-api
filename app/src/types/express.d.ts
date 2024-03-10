declare namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        username: string;
        isAdmin: boolean;
      };
    }
  }