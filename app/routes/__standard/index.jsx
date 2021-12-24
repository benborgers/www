import { Link } from "remix";

export let meta = () => ({
  title: "Ben Borgers",
});

export default function () {
  return (
    <div>
      <div className="grid sm:grid-cols-[1fr,max-content] gap-4">
        <div className="prose max-w-none prose-sky">
          <p>
            Hi! I’m a freshman at Tufts University studying computer science.
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

        <div
          className="mt-2 border-2 border-sky-400 bg-sky-200 w-36 h-36 rounded-full overflow-hidden
          row-start-1 sm:row-auto"
        >
          <img src="/img/me.png" />
        </div>
      </div>

      <div className="mt-24 space-y-24">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Work</h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-6">
            <ProjectCard
              name="Buttondown"
              description="Frontend development using Vue."
              time="Summer 2021 - present"
              link="https://buttondown.email"
              emoji="✉️"
              color="blue"
            />
            <ProjectCard
              name="Diyi"
              description="Built a course registration program for an online school using Laravel."
              time="Summer 2020"
              link="https://diyiboston.com"
              emoji="📚"
              color="purple"
            />
            <ProjectCard
              name="IBM"
              description="Interned at IBM Security for two summers, working on a new security offering for enterprise."
              time="Summers 2019 and 2020"
              emoji="🐝"
              color="yellow"
            />
            <ProjectCard
              name="Rep.ly"
              description="Full-stack development using React and Node.js."
              time="Summer 2020"
              link="https://rep.ly"
              emoji="💬"
              color="gray"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-6">
            <ProjectCard
              name="opensheet"
              description="An open-source API to get a Google Sheet as JSON, no authentication required."
              time="Fall 2021"
              link="https://github.com/benborgers/opensheet"
              emoji="💾"
              color="sky"
            />
            <ProjectCard
              name="War Room"
              description="A shared to-do list app with friends."
              time="Fall 2021"
              post="war-room"
              emoji="🎛"
              color="gray"
            />
            <ProjectCard
              name="Bagel Institute"
              time="Summer 2021"
              description="Tools for more interactive college teaching."
              link="https://bagel.institute"
              emoji="🥯"
              color="orange"
            />
            <ProjectCard
              name="Vault"
              time="Spring 2021"
              description="An app I built for myself to store passwords."
              link="https://vault.elk.sh"
              emoji="🗝"
              color="gray"
            />
            <ProjectCard
              name="Blocks"
              time="2019 - 2021"
              description="An app for my high school’s schedule used by over 2,000 students and teachers."
              link="https://blocks.elk.sh"
              emoji="🎒"
              color="red"
            />
            <ProjectCard
              name="Cornflakes"
              time="Early 2021"
              description="A simple and privacy-focused email newsletter tool."
              link="https://cornflakes.app"
              emoji="🥣"
              color="sky"
            />
            <ProjectCard
              name="Potion"
              time="2020-2021"
              description="An open-source reverse-engineered API for Notion."
              link="https://github.com/benborgers/potion"
              emoji="🧪"
              color="green"
            />
            <ProjectCard
              name="emojicdn"
              time="End of 2020"
              description="An API for getting images of emojis that serves two million requests per month."
              link="https://emojicdn.elk.sh"
              emoji="🥳"
              color="purple"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * All the Tailwind classes used, so they don’t get purged.
 * bg-gray-50 text-gray-900 text-gray-500 text-gray-700 border-gray-200
 * bg-sky-50 text-sky-900 text-sky-500 text-sky-700 border-sky-200
 * bg-orange-50 text-orange-900 text-orange-500 text-orange-700 border-orange-200
 * bg-blue-50 text-blue-900 text-blue-500 text-blue-700 border-blue-200
 * bg-red-50 text-red-900 text-red-500 text-red-700 border-red-200
 * bg-purple-50 text-purple-900 text-purple-500 text-purple-700 border-purple-200
 * bg-yellow-50 text-yellow-900 text-yellow-500 text-yellow-700 border-yellow-200
 * bg-green-50 text-green-900 text-green-500 text-green-700 border-green-200
 */

const ProjectCard = ({
  name,
  description,
  time,
  emoji,
  color,
  link = null,
  post = null,
}) => {
  return (
    <div
      className={`bg-${color}-50 text-${color}-900 border border-${color}-200 p-4 rounded-lg grid gap-y-4`}
    >
      <div>
        <div className="grid grid-cols-[1fr,max-content] gap-x-2 items-center mb-3">
          <div>
            <p className={`text-sm text-${color}-500`}>{time}</p>
            <p className="font-semibold text-xl tracking-tight">{name}</p>
          </div>
          <img
            className="block w-8"
            src={`https://emojicdn.elk.sh/${emoji}`}
            alt={emoji}
          />
        </div>
        <p>{description}</p>
      </div>

      {link && (
        <div className="flex justify-end self-end">
          <a
            href={link}
            className={`block text-${color}-700 underline text-sm hover:opacity-75 duration-150 transition-opacity`}
          >
            {link.replace("https://", "").replace("github.com/", "")}
          </a>
        </div>
      )}

      {post && (
        <div className="flex justify-end self-end">
          <Link
            to={`posts/${post}`}
            className={`block text-${color}-700 underline text-sm hover:opacity-75 duration-150 transition-opacity`}
          >
            read more &rarr;
          </Link>
        </div>
      )}
    </div>
  );
};
