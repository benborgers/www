import React from "react";
import * as PhosphorIcons from "phosphor-react";

export default function Icon({
  name,
  weight,
  className,
}: {
  name: string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
}) {
  const Component = PhosphorIcons[name];
  return <Component weight={weight} className={className} />;
}
