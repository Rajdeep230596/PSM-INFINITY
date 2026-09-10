export const metadata = {
  title: "GoDaddy storage test",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 32, maxWidth: 640 }}>
        {children}
      </body>
    </html>
  );
}
