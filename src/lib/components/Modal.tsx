"use client";

import { useEffect } from "react";

export type OnClose = () => void;

export function Modal({
  children,
  onClose,
}: React.PropsWithChildren<{
  onClose: OnClose;
}>) {
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    });

    return () => {
      document.removeEventListener("keydown", () => {});
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 h-screen w-screen flex">
      <div className="m-auto w-1/2 h-3/4 overflow-scroll bg-background p-4 flex flex-col">
        <div className="grow">{children}</div>

        <button type="button" className="ml-auto" onClick={() => onClose()}>
          Close...
        </button>
      </div>
    </div>
  );
}
