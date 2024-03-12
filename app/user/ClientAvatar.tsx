"use client";
import Image from "next/image";

export default function ClientAvatar({ imageSrc }: { imageSrc: string }) {
  return (
    <Image
      className="rounded-full"
      src={imageSrc || "/images/KEKW.webp"}
      width={150}
      height={150}
      sizes="150px"
      alt="avatar"
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = "/images/KEKW.webp";
      }}
    />
  );
}
