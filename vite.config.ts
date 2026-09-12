import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

// No @vitejs/plugin-react here: reactRouter() already applies the React
// transform and Fast Refresh. Running both double-transforms JSX.
export default defineConfig({
  plugins: [reactRouter()],
});
