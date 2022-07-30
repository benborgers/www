import React from "react";
import { ArrowDown } from "phosphor-react";

type IconName = "arrow-down";

const ICONS: Record<IconName, React.ReactNode> = {
  "arrow-down": ArrowDown,
};

export default function Icon({
  name,
  weight,
  className,
}: {
  name: IconName;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
}) {
  const Component = ICONS[name];
  return <Component weight={weight} className={className} />;
}
