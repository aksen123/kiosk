import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilWrapper from "./RecoilWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "만두 키오스크",
  description: "설명",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={"w-screen flex justify-center overflow-hidden"}>
        <RecoilWrapper>{children}</RecoilWrapper>
      </body>
    </html>
  );
}
