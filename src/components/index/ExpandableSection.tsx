import React, { useState } from "react";
import { ArrowDown, ArrowUp } from "phosphor-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExpandableSection({
  title,
  className,
  children,
}: {
  title: string;
  className: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className={`bg-neutral-100  rounded-xl overflow-hidden relative ${className}`}
      initial={false}
      animate={{ height: open ? "auto" : 230 }}
      transition={{
        type: "spring",
        duration: 0.3,
        bounce: 0.1,
        ease: "easeInOut",
      }}
    >
      <AnimatePresence initial={false}>
        {!open && (
          <motion.div
            className="h-1/2 absolute inset-x-0 bottom-0 bg-gradient-to-b from-neutral-100/0 to-neutral-100 pointer-events-none"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <button
        className="text-white bg-neutral-700 px-3 py-0.5 rounded-full absolute bottom-4 right-4 flex items-center gap-1 border-2 border-white"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <>
            <span className="text-sm font-semibold">See Less</span>
            <ArrowUp weight="fill" />
          </>
        ) : (
          <>
            <span className="text-sm font-semibold">See More</span>
            <ArrowDown weight="fill" />
          </>
        )}
      </button>

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-neutral-200/0 via-neutral-200 to-neutral-200/0" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-neutral-200/0 via-neutral-200 to-neutral-200/0" />

      <div className="p-4 pb-12">
        <p className="font-semibold text-neutral-900">{title}</p>
        <ul className="[&_li]:mt-3 list-disc ml-6 text-neutral-600">
          {children}
        </ul>
      </div>
    </motion.div>
  );
}
