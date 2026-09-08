import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AJC Media | Vancouver Photography",
    template: "%s | AJC Media"
  },
  description:
    "AJC Media is a Vancouver photography studio for weddings, portraits, birthdays, baby showers, family milestones, and brand content.",
  metadataBase: new URL("https://www.ajcmedia.ca")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
