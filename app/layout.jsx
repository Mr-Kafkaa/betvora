export const metadata = {
  title: "Betvora",
  description: "Sportsbook social",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}