import React from "react";

export default function SoldOut() {
  return (
    <div className="absolute top-0 left-0 bg-black opacity-70 w-full h-full cursor-default flex justify-center items-center rounded-2xl">
      <h2 className="text-white text-3xl font-bold transform">품 절</h2>
    </div>
  );
}
