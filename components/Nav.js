import Link from "next/link"
import { useRouter } from "next/router"

export default ({ social }) => {
  const router = useRouter()

  return (
    <>
      <nav>
        <Link href="/projects"><a className={router.pathname === "/projects" ? "current" : ""}>Projects</a></Link>
        <Link href="/blog"><a className={router.pathname === "/blog" ? "current" : ""}>Blog</a></Link>

        {social && <div className="divider" />}

        {social && (
          <>
            <a href="https://twitter.com/benborgers">Twitter</a>
            <a href="https://github.com/benborgers">GitHub</a>
            <a href="mailto:borgersbenjamin@gmail.com">Email</a>
          </>
        )}
      </nav>

      <style jsx>{`
        nav {
          background-color: var(--background-secondary);
          max-width: max-content;
          margin-top: 24px;
          padding: 16px 24px;
          border-radius: 4px;
          display: grid;
          grid-template-columns: repeat(${social ? 6 : 2}, max-content);
          grid-column-gap: 24px;
          grid-row-gap: 16px;
        }

        a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 20px;
          display: block;
        }

        a.current {
          color: var(--text-primary);
        }

        .divider {
          border-right: 2px solid var(--background-tertiary);
        }

        @media (max-width: 500px) {
          nav {
            ${social ? "grid-template-columns: max-content max-content max-content;" : ""}
            max-width: 100%;
          }

          .divider {
            border: none;
          }
        }
      `}</style>
    </>
  )
}