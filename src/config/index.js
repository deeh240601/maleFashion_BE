import dotenv from 'dotenv';

dotenv.config();
export const DB_LINK = process.env.DB_LINK;
export const PORT = process.env.PORT;
export const SECRECT_KEY = process.env.SECRECT_KEY;
export const REFRESH_KEY = process.env.REFRESH_KEY;
export const CLIENT_APP = process.env.CLIENT_APP;
export const ADMIN_APP = process.env.ADMIN_APP;
