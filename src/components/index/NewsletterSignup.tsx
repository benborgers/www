import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "phosphor-react";

export default function NewsletterSignup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>newsletter!</button>

      <AnimatePresence>
        {open && (
          <Dialog
            static
            open={open}
            onClose={() => setOpen(false)}
            className="relative z-50"
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

            <div className="fixed bottom-4 inset-x-4 sm:inset-0 flex items-center justify-center">
              <Dialog.Panel
                className="mx-auto w-full max-w-lg rounded-xl bg-white p-4 sm:px-6 h-[70vh] sm:h-auto"
                as={motion.div}
                initial={{ y: 4 }}
                animate={{ y: 0 }}
                exit={{ y: 4 }}
              >
                <div className="flex items-center justify-between gap-8">
                  <Dialog.Title className="text-lg font-bold text-neutral-800">
                    Sign up for my newsletter!
                  </Dialog.Title>
                  <button
                    onClick={() => setOpen(false)}
                    className="outline-neutral-200 outline-offset-2 rounded"
                  >
                    <X weight="bold" className="text-neutral-400" />
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
