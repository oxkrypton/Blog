"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export function ModeToggleIcon() {
  return (
    <>
      <SunIcon className="h-full w-full dark:hidden" />
      <MoonIcon className="hidden h-full w-full dark:block" />
    </>
  );
}

export const ModeToggle = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "onClick">
>(({ className, children, ...props }, ref) => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      ref={ref}
      type="button"
      variant="link"
      size="icon"
      aria-label="Toggle theme"
      {...props}
      className={cn(className)}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {children ?? <ModeToggleIcon />}
    </Button>
  );
});
ModeToggle.displayName = "ModeToggle";
