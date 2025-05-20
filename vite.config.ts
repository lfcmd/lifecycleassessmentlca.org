import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// In vite.config.ts
export default defineConfig({
  base: '/',  // Change this if your site will be in a subdirectory
  // other config...
})
