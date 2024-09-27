import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3),
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  avatar: z.string().optional(),
  coverImage: z.string().optional(),
  description: z.string().optional(),
  watchHistory: z.array(z.string()).optional(),
  playlists: z.array(z.string()).optional(),
  refreshToken: z.string().optional(),
});


export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
