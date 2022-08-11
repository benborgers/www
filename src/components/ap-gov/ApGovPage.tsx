import React from "react";
import { Disclosure } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, ArrowLeft } from "phosphor-react";

export default function () {
  return (
    <div className="max-w-screen-sm mx-auto text-neutral-700">
      <div className="p-4 sm:pt-24 pb-32">
        <div>
          <a
            href="/"
            class="flex items-center gap-2 text-neutral-400 max-w-max hover:bg-neutral-200/50 transition-colors px-2 py-1 rounded-lg -ml-2"
          >
            <ArrowLeft weight="bold" size={12} />
            <span class="text-sm font-semibold">benborgers.com</span>
          </a>
        </div>

        <div className="mt-4 prose prose-neutral">
          <p>
            This page lists the court cases that we had to know for the AP Gov
            exam (as of 2021).
          </p>
          <p>
            I took AP Gov in my senior year of high school, and liked it a lot.
            I made this page in May of 2021 as a way of studying for the AP
            test.
          </p>
          <p>
            It eventually got lost when I re-did my website, but now (in July of
            2022) I’ve copied over the original page and republished it. I quite
            liked thinking about these court cases, so I thought they’d be nice
            to have here.
          </p>
        </div>

        <div>
          <Heading>Federalism</Heading>
          <Case
            name="McCulloch v. Maryland"
            bullets={[
              "Does Congress have the Constitutional authority to create a federal bank?",
              'Congress does have the power to charter the bank, under the "necessary and proper" clause of the Constitution.',
              "Maryland has no power to tax the bank, since that would give it the ability to kill the bank.",
            ]}
          />

          <Case
            name="United States v. Lopez"
            bullets={[
              "Congress cannot use the commerce clause (the power to regulate interstate commerce) to make possession of a gun in a school zone a federal crime.",
              `Carrying a gun into school isn't an economic activity, so it isn't covered under Congress' power to regulate interstate commerce.`,
              `Not a lot of cases have limited Congress' power under the commerce clause.`,
            ]}
          />
        </div>

        <div>
          <Heading>Balancing Order and Liberty</Heading>
          <Case
            name="Engel v. Vitale"
            bullets={[
              `State officials (including teachers) may not compose prayers and require that they be recited in school (even if they are non-denominational and students can opt-out).`,
              `Violates establishment clause.`,
            ]}
          />

          <Case
            name="Wisconsin v. Yoder"
            bullets={[
              `Supreme Court ruled that Amish families had the right to not send their children to school (as Wisconsin required) because they have the right to free expression of religion.`,
            ]}
          />

          <Case
            name="Tinker v. Des Moines Independent Community School District"
            bullets={[
              "Students protested the Vietnam War by wearing black armbands at school.",
              `Supreme Court held that the armbands represented expression that was protected under the first amendment.`,
              `Students retain their free expression rights as long as they don't materially and substantially interfere with the school's operations.`,
            ]}
          />

          <Case
            name="New York Times Co. v. United States"
            bullets={[
              `Can the government stop a newspaper from publishing the Pentagon Papers, arguing that it hurts national security?`,
              `Supreme Court rules no, the government cannot silence journalism. This would be undemocratic.`,
            ]}
          />

          <Case
            name="Schenck v. United States"
            bullets={[
              `Schenck made pamphlets encouraging people to dodge the World War I draft.`,
              `Speech can only be banned if it's intending to and likely to cause imminent unlawful action.`,
            ]}
          />

          <Case
            name="Citizens United v. Federal Election Commission"
            bullets={[
              `Strikes down some provisions of campaign finance law.`,
              `Money is speech, and the speech of corporations cannot be silenced.`,
            ]}
          />
        </div>

        <div>
          <Heading>Incorporating Liberties into the States</Heading>
          <Case
            name="Gideon v. Wainwright"
            bullets={[
              `States are required to provide legal counsel to defendants charged with felony.`,
              `Incorporated the Sixth Amendment.`,
            ]}
          />

          <Case
            name="Roe v. Wade"
            bullets={[
              `Banning abortion in Texas goes against the right to privacy in the Constitution.`,
            ]}
          />

          <Case
            name="McDonald v. Chicago"
            bullets={[
              `The second amendment applies to states too (not just the federal government) - Chicago cannot ban gun possession in the home.`,
            ]}
          />
        </div>

        <div>
          <Heading>Equality</Heading>
          <Case
            name="Brown v. Board of Education"
            bullets={[
              `Separate but equal is inherently unequal.`,
              `Separating students violates the Fourteenth Amendment.`,
            ]}
          />
        </div>

        <div>
          <Heading>Equality of Representation</Heading>
          <Case
            name="Baker v. Carr"
            bullets={[
              `The Supreme Court can force Tennessee to re-draw its districts more fairly.`,
              `Caused a "reapportionment revolution" where people had to re-draw districts.`,
            ]}
          />

          <Case
            name="Shaw v. Reno"
            bullets={[
              `Funny-shaped districts cause the impression of manipulation, so they're not allowed.`,
            ]}
          />
        </div>

        <div>
          <Heading>Checks and Balances</Heading>
          <Case
            name="Marbury v. Madison"
            bullets={[
              `Establishes judicial review, which gives the Supreme Court the ability to declare a legislative or executive act in violation of the Constitution.`,
            ]}
          />
        </div>
      </div>
    </div>
  );
}

const Heading: React.FC = ({ children }) => {
  return (
    <h1 className="mt-12 font-bold text-2xl tracking-tight text-neutral-800 font-serif italic">
      {children}
    </h1>
  );
};

const Case: React.FC<{ name: string; bullets: string[] }> = ({
  name,
  bullets,
}) => {
  return (
    <div className="block mt-3 bg-neutral-200/50 pt-3 pb-2 px-3 w-full rounded-lg">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="group">
              <div className="flex items-start space-x-2">
                <div className="mt-[0.08rem] text-neutral-500 group-hover:bg-neutral-200 transition-colors p-1 rounded">
                  {open ? <X weight="bold" /> : <Plus weight="bold" />}
                </div>
                <p className="mt-0.5 text-left font-semibold text-neutral-800">
                  {name}
                </p>
              </div>
            </Disclosure.Button>

            <AnimatePresence>
              {open && (
                <Disclosure.Panel
                  static
                  className="text-neutral-600 overflow-hidden"
                  as={motion.div}
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.3 }}
                >
                  <div className="mt-3 mb-4">
                    <ul className="list-disc ml-8 space-y-2">
                      {bullets.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </Disclosure.Panel>
              )}
            </AnimatePresence>
          </>
        )}
      </Disclosure>
    </div>
  );
};
