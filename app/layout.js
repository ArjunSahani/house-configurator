// app/layout.js
import './globals.css'

export const metadata = {
  title: 'House Configurator',
  description: 'Customize your house roof, color, and material',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}