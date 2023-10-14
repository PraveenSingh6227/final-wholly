const dev = process.env.NODE_ENV !== "production";

export const server = dev 
    ? "https://whollykart.com/admin" 
    : "https://whollykart.com/admin";
