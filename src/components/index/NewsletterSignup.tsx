import { useState, useEffect, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Confetti, Envelope } from "phosphor-react";

export default function NewsletterSignup() {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Enable deeplinking into the newsletter signup modal.
    // benborgers.com/#newsletter
    if (window.location.hash === "#newsletter") {
      setOpen(true);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-right text-sm font-semibold text-rose-600 flex items-center gap-1.5
          underline decoration-transparent hover:decoration-rose-600 transition-colors duration-100"
      >
        <Envelope weight="fill" size={16} />
        Get updates via email
      </button>

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

            <div className="fixed inset-0 flex items-center justify-center p-2">
              <Dialog.Panel
                className="mx-auto w-full max-w-lg rounded-xl bg-white p-4 sm:p-6"
                as={motion.div}
                initial={{ y: 4 }}
                animate={{ y: 0 }}
                exit={{ y: 4 }}
              >
                <div className="flex items-start justify-between gap-8">
                  {!success ? (
                    <Dialog.Title className="text-lg font-bold text-neutral-800 tracking-tight">
                      Subscribe to my newsletter!
                    </Dialog.Title>
                  ) : (
                    <div />
                  )}

                  <button
                    onClick={() => setOpen(false)}
                    className="outline-neutral-200 outline-offset-2 rounded"
                  >
                    <X weight="bold" className="text-neutral-400" />
                  </button>
                </div>

                {success ? (
                  <div className="mt-4">
                    <Confetti weight="duotone" size={24} className="mx-auto" />
                    <p className="mt-1 text-neutral-800 font-semibold text-center">
                      Thank you!
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mt-2 text-neutral-600">
                      <p>
                        I send out an email newsletter every week with new
                        projects and life updates. Follow along!
                      </p>
                    </div>

                    <div className="mt-4 mb-1">
                      <Form onSuccess={() => setSuccess(true)} open={open} />
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}

function Form({ onSuccess, open }: { onSuccess: () => void; open: boolean }) {
  const ref = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event) {
    event.preventDefault();
    const email = ref.current.querySelector('input[type="email"]')?.value;

    setLoading((state) => {
      state = true;
      return state;
    });

    fetch("https://neptune.ooo/benborgers-newsletter/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.errors) {
          setError(json.errors.email[0]);
        } else {
          setError(null);
          onSuccess();
        }

        setLoading((state) => {
          state = false;
          return state;
        });
      });
  }

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        ref.current?.querySelector('input[type="email"]')?.focus();
      });
    }
  }, [open]);

  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="type your email..."
        className="w-full rounded-lg placeholder:text-neutral-400 border-neutral-300 bg-neutral-50 shadow-sm focus:border-rose-500 focus:ring-rose-500"
      />

      {error && <p className="mt-2 text-red-600">{error}</p>}

      <div className="mt-3 flex justify-end">
        <button
          className="px-4 py-2 rounded-lg shadow bg-rose-600 text-white font-semibold relative"
          disabled={loading}
        >
          <span className={loading ? "opacity-0" : ""}>Subscribe</span>

          {loading && (
            <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
              <div className="h-5 w-5 border-2 border-white border-t-white/30 rounded-full animate-spin" />
            </div>
          )}
        </button>
      </div>
    </form>
  );
}
