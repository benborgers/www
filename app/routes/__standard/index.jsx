import React, { useState, useEffect } from "react";
import { Link, useLoaderData } from "remix";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/solid";
import getPosts from "~/lib/getPosts.server";

export let meta = () => ({ title: "Ben Borgers" });

export let loader = async () => ({ posts: await getPosts() });

export default function () {
  const data = useLoaderData();

  return (
    <>
      <div className="mt-32" />
      <p className="text-neutral-900 text-lg font-semibold tracking-tighter">
        Ben Borgers
      </p>

      <div className="mt-8 prose prose-neutral prose-a:font-normal prose-a:text-inherit">
        <p>
          Hi! I’m Ben Borgers, a freshman at Tufts University studying computer
          science.
        </p>
        <p>
          You can find me on{" "}
          <a href="https://twitter.com/benborgers">twitter</a> or{" "}
          <a href="https://github.com/benborgers">github</a>. I also write{" "}
          <Link to="/posts">programming-related blog posts</Link> on this
          website.
        </p>
        <p>
          Lastly, I love getting emails:{" "}
          <Link to="/contact">please reach out!</Link>
        </p>
      </div>

      <div className="mt-16" />
      <Table
        title="Work"
        rows={[
          {
            title: "Buttondown",
            subtitle: "summer 2021 - present",
            description: "Frontend development using Vue.",
            link: "https://buttondown.email",
          },
          {
            title: "Diyi",
            subtitle: "summer 2020",
            description:
              "Built a course registration program for an online school using Laravel.",
            link: "https://diyiboston.com",
          },
          {
            title: "IBM",
            subtitle: "summers 2019 and 2020",
            description:
              "Interned at IBM Security for two summers, working on a new security offering for enterprise.",
          },
          {
            title: "Rep.ly",
            subtitle: "summer 2020",
            description: "Full-stack development using React and Node.js.",
            link: "https://rep.ly",
          },
        ]}
      />

      <div className="mt-16" />
      <Table
        title="Projects"
        rows={[
          {
            title: "opensheet",
            subtitle: "fall 2021",
            description:
              "An open-source API to get a Google Sheet as JSON, no authentication required.",
            link: "https://github.com/benborgers/opensheet",
          },
          {
            title: "War Room",
            subtitle: "fall 2021",
            description: "A shared to-do list app with friends.",
            link: "posts/war-room",
          },
          {
            title: "Bagel Institute",
            subtitle: "summer 2021",
            description: "Tools for more interactive college teaching.",
            link: "https://bagel.institute",
          },
          {
            title: "Vault",
            subtitle: "spring 2021",
            description: "An app I built for myself to store passwords.",
            link: "https://vault.elk.sh",
          },
          {
            title: "Blocks",
            subtitle: "2019 - 2021",
            description:
              "An app for my high school’s schedule used by over 2,000 students and teachers.",
            link: "https://blocks.elk.sh",
          },
          {
            title: "Cornflakes",
            subtitle: "early 2021",
            description: "A simple and privacy-focused email newsletter tool.",
            link: "https://cornflakes.app",
          },
          {
            title: "Potion",
            subtitle: "2020-2021",
            description: "An open-source reverse-engineered API for Notion.",
            link: "https://github.com/benborgers/potion",
          },
          {
            title: "emojicdn",
            subtitle: "end of 2020",
            description:
              "An API for getting images of emojis that serves two million requests per month.",
            link: "https://emojicdn.elk.sh",
          },
        ]}
      />

      <div className="mt-16 scroll-mt-8" id="posts-scroll-marker" />
      <Table
        title="Technical Blog Posts"
        rows={data.posts.map((post) => ({
          title: post.title,
          subtitle: new Date(post.date)
            .toLocaleString("en-US", {
              timeZone: "UTC",
              month: "short",
              day: "numeric",
              year: "numeric",
            })
            .toLowerCase(),
          link: `posts/${post.slug}`,
        }))}
      />
    </>
  );
}

const Table = ({ title, rows }) => {
  const SHOWN_ROWS = 4; // The number of rows that are shown by default.
  const shownRows = rows.slice(0, SHOWN_ROWS);
  const hiddenRows = rows.slice(SHOWN_ROWS);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#posts" && title.includes("Posts")) {
      setShow(true);
      setTimeout(() => {
        document
          .querySelector("#posts-scroll-marker")
          .scrollIntoView({ behavior: "smooth" });
      }, 200);
      window.location.hash = "";
    }
  }, []);

  const transition = { type: "spring", bounce: 0.1, duration: 0.2 };

  return (
    <>
      <div className="border border-neutral-900 rounded-xl overflow-hidden">
        <div className="p-4 bg-neutral-900">
          <p className="text-white text-lg font-semibold tracking-tighter">
            {title}
          </p>
        </div>

        <div
          className={`divide-y divide-neutral-900 ${
            hiddenRows.length > 0 ? "border-b border-neutral-900" : ""
          }`}
        >
          {shownRows.map((row) => (
            <Row key={row.title} {...row} />
          ))}
        </div>

        {hiddenRows.length > 0 && (
          <>
            <AnimatePresence>
              {!show && (
                <motion.div
                  className="overflow-hidden"
                  exit={{ height: 0 }}
                  transition={transition}
                >
                  <motion.button
                    onClick={() => setShow(true)}
                    className="block w-full px-4 py-3 font-semibold text-sm bg-gray-200 text-neutral-600"
                  >
                    Show More
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {show && (
                <motion.div
                  className="divide-y divide-neutral-900 overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  transition={transition}
                >
                  {hiddenRows.map((row) => (
                    <Row key={row.title} {...row} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </>
  );
};

const Row = ({ title, subtitle = null, description = null, link = null }) => {
  const hasLink = link != null;
  const externalLink = hasLink && link.startsWith("http");

  const innards = (
    <div
      className={`px-4 py-3 bg-white
      ${
        hasLink
          ? "grid grid-cols-[1fr,max-content] gap-x-4 hover:bg-neutral-100 transition-colors duration-200"
          : ""
      }`}
    >
      <div>
        <p>
          <span className="font-semibold text-neutral-800">{title}</span>{" "}
          {subtitle && (
            <span
              className="text-neutral-400"
              dangerouslySetInnerHTML={{
                __html: `(${subtitle.replace(/ /g, "&nbsp;")})`,
              }}
            />
          )}
        </p>
        {description && <p className="text-neutral-500">{description}</p>}
      </div>

      {link && (
        <div>
          <ArrowRightIcon
            className={`h-4 w-4 text-neutral-600 ${
              externalLink ? "-rotate-45" : ""
            }`}
          />
        </div>
      )}
    </div>
  );

  if (!hasLink) return innards;

  if (externalLink) {
    return (
      <a
        href={link}
        className="block"
        target="_blank"
        rel="noopener noreferrer"
      >
        {innards}
      </a>
    );
  }

  return (
    <Link to={link} className="block">
      {innards}
    </Link>
  );
};
