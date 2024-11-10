export const baseUrl =
process.env.VERCEL_URL && process.env.NODE_ENV === "production"
  ? `https://${process.env.VERCEL_URL}` // Automatically gets the deployment URL
  : "http://localhost:3000"; // Fallback for local development