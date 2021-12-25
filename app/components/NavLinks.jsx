import { NavLink } from "remix";

export default function () {
  return (
    <p className="space-x-3">
      <NavLink
        to="/contact"
        prefetch="intent"
        className={({ isActive }) =>
          `text-sm font-medium ${
            isActive ? "text-neutral-900" : "text-neutral-500"
          }`
        }
      >
        Contact
      </NavLink>
      <a
        href="https://twitter.com/benborgers"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => window.fathom.trackGoal("E3LD3YS1", 0)}
        className="text-sm font-medium text-neutral-500"
      >
        Twitter
      </a>
    </p>
  );
}
