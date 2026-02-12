
import AuthProvider from "./authprovider"
import "./globals.css"
import "@livekit/components-styles"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
        </body>
    </html>
  )
}
