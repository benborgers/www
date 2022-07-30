import React from "react";
import { HandWaving } from "phosphor-react";

type IconName = "hand-waving";

const ICONS: Record<IconName, React.ReactNode> = {
  "hand-waving": HandWaving,
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
