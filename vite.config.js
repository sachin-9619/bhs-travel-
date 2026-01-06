import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'BHS Travel App',
        short_name: 'BHS',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0f172a',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'icon-192/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'icon-512/png',
          },
        ],
      },
    }),
  ],
})
