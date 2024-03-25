import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilWrapper from "./RecoilWrapper";
import GlobalComponent from "./Components/GlobalComponent";

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
      <body
        className={
          "w-screen h-screen flex justify-center items-center overflow-hidden"
        }
      >
        <main
          id="main"
          className="w-[70%] h-[80%] min-w-[1024px] min-h-[720px] relative flex border-48 border-[#3d3d3d] rounded-2xl"
        >
          <div className="absolute -top-[32px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#222] rounded-full flex justify-center items-center">
            <span className="w-2 h-2 bg-[#474747] rounded-full"></span>
          </div>
          <RecoilWrapper>
            {children}
            <GlobalComponent />
          </RecoilWrapper>
        </main>
      </body>
    </html>
  );
}
