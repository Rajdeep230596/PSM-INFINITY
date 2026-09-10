export const metadata = {
  title: "PSM Infinity Admin",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, background: "#111", color: "#f4f1ea" }}>
        {children}
      </body>
    </html>
  );
}
