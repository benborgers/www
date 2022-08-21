import { useState, useRef } from "react";

export default function UnsubscribePage() {
  const ref = useRef<null, HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = ref.current.querySelector('input[type="email"]')?.value;

    setLoading((state) => {
      state = true;
      return state;
    });

    fetch("https://neptune.ooo/benborgers-newsletter/unsubscribe", {
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
          setSuccess(true);
        }

        setLoading((state) => {
          state = false;
          return state;
        });
      });
  };

  if (success) {
    return (
      <div className="text-neutral-700 p-4 sm:pt-16 max-w-md mx-auto text-center">
        <p className="text-neutral-800 text-lg font-bold">
          You’ve been unsubscribed.
        </p>
        <a
          href="/"
          className="block mt-1 text-neutral-500 underline decoration-neutral-300"
        >
          back to benborgers.com &rarr;
        </a>
      </div>
    );
  }

  return (
    <div className="text-neutral-700 p-4 sm:pt-16 max-w-md mx-auto">
      <h1 className="text-lg text-neutral-800 font-bold">
        Unsubscribe from Ben’s newsletter
      </h1>

      <div className="mt-4">
        <form ref={ref} onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="type your email..."
            className="w-full rounded-lg placeholder:text-neutral-400 border-neutral-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          />

          {error && <p className="mt-2 text-red-600">{error}</p>}

          <div className="mt-3 flex justify-end">
            <button
              className="px-4 py-2 rounded-lg shadow bg-rose-600 text-white font-semibold relative"
              disabled={loading}
            >
              <span className={loading ? "opacity-0" : ""}>Unsubscribe</span>

              {loading && (
                <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                  <div className="h-5 w-5 border-2 border-white border-t-white/30 rounded-full animate-spin" />
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
