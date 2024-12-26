import { type Icon } from "@phosphor-icons/react";

export default function NavLink({
  href,
  newTab = false,
  label,
  subtitle,
  icon,
  pathname,
}: {
  href: string;
  newTab?: boolean;
  label: string;
  subtitle?: string;
  icon: Icon;
  pathname?: string;
}) {
  const Icon = icon;

  const isActive = pathname === href;

  return (
    <a
      href={href}
      className={[
        "flex items-start gap-2.5 px-3 py-2",
        isActive ? "text-gray-50" : "text-gray-400",
        "bg-gray-700 active:bg-gray-700/75",
        "border-t border-t-gray-600",
        "first-of-type:rounded-t-xl last-of-type:rounded-b-xl",
        "border-b border-b-gray-900/40 last-of-type:border-b-0",
      ].join(" ")}
      target={newTab ? "_blank" : undefined}
    >
      <Icon weight="fill" size={18} />
      <div>
        <p className="text-sm font-bold">{label}</p>
        {subtitle && (
          <p className="text-xs text-gray-500 font-medium">{subtitle}</p>
        )}
      </div>
    </a>
  );
}
