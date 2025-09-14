"use client";

import Link from "next/link";
import { useState } from "react";

export default function FloatingMenuButton() {
  const [isWrapped, toggleWrapped] = useState(true);

  return (
    <aside className="absolute right-[16px] top-[16px] flex flex-col items-center">
      <button
        type="button"
        className="rounded-[50%] bg-white cursor-pointer w-[48px] h-[48px] text-2xl mb-3"
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
