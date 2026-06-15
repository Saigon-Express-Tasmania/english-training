"use client";

import { promptUnlockPin } from "@/views/listening/lib/prompt-unlock-pin";

type ListeningUnlockButtonProps = {
  onUnlock: () => void;
  className?: string;
};

export function ListeningUnlockButton({
  onUnlock,
  className = "",
}: ListeningUnlockButtonProps) {
  async function handleUnlock() {
    const unlocked = await promptUnlockPin();
    if (unlocked) {
      onUnlock();
    }
  }

  return (
    <button
      type="button"
      className={`btn btn-outline-main rounded-pill !flex items-center justify-center gap-8${className ? ` ${className}` : ""}`}
      onClick={() => {
        void handleUnlock();
      }}
    >
      Unlock
      <i className="ph-bold ph-lock-key flex text-lg"></i>
    </button>
  );
}
