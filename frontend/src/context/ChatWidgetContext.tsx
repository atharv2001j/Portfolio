import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type ChatWidgetContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const ChatWidgetContext = createContext<ChatWidgetContextValue | null>(null);

export function ChatWidgetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((v) => !v),
    }),
    [isOpen]
  );

  return <ChatWidgetContext.Provider value={value}>{children}</ChatWidgetContext.Provider>;
}

export function useChatWidget() {
  const ctx = useContext(ChatWidgetContext);
  if (!ctx) throw new Error("useChatWidget must be used within a ChatWidgetProvider");
  return ctx;
}
