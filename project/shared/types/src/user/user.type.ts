export type User = {
  id?: string;
  email: string;
  name: string;
  postsCount: number;
  subsribersCount: number;
  passwordHash: string;
  createdAt?: string;
  avatar?: string;
};
