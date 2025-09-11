"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function FloatingMenuButton() {
  const pathName = usePathname();
  const router = useRouter();

  const [isWrapped, toggleWrapped] = useState(true);

  return (
    <aside className="absolute right-[24px] bottom-[24px] flex flex-col-reverse items-center">
      <button
        type="button"
        className="rounded-[50%] bg-white cursor-pointer w-[48px] h-[48px] text-2xl mt-3"
        onClick={() => toggleWrapped(!isWrapped)}
      >
        {isWrapped ? "➕" : "➖"}
      </button>
      {!isWrapped && (
        <nav className="flex flex-col gap-3">
          <FloatingLinkButton href="/settings" icon="⚙️" />
          <FloatingLinkButton href="/expenses" icon="💰" />
          <FloatingLinkButton href="/" icon="📋" />
        </nav>
      )}
    </aside>
  );
}

const FloatingLinkButton = ({ icon, href }: { icon: string; href: string }) => (
  <Link
    href={href}
    className="flex items-center justify-center rounded-[50%] bg-white cursor-pointer w-[48px] h-[48px] text-2xl animation-pulse-init"
  >
    {icon}
  </Link>
);
