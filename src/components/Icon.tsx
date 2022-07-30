import React from "react";
import { ArrowDown, TwitterLogo, PaperPlaneTilt } from "phosphor-react";

type IconName = "arrow-down" | "twitter" | "paper-plane-tilt";

const ICONS: Record<IconName, React.ReactNode> = {
  "arrow-down": ArrowDown,
  twitter: TwitterLogo,
  "paper-plane-tilt": PaperPlaneTilt,
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
