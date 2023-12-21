export type User = {
  email: string;
  name: string;
  createdAt: string;
  postsCount: number;
  subsribersCount: number;
  passwordHash: string;
  avatar?: string;
};
