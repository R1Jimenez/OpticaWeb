import { defineConfig } from 'cypress'

// El servidor de Vite de component testing corre en este mismo proceso y lee esta variable (ver vite.config.js)
process.env.CYPRESS_COMPONENT = 'true'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
  },
  component: {
    specPattern: 'src/**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
