import { useEffect, Fragment } from 'react'
import Head from 'next/head'
import copy from '@data/copy.json'

export default function Home() {
  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', (user) => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/'
          })
        }
      })
    }
  }, [])
  return (
    <Fragment>
      <Head>
        <title>Netlify CMS && Next.js</title>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <main className="min-h-screen flex items-center justify-center mx-auto flex-col prose">
        <h1 className="text-center">{copy.headline}</h1>
        <h2>{copy.tagline}</h2>
      </main>
    </Fragment>
  )
}

// <script
//   dangerouslySetInnerHTML={{
//     __html: `
//     if (window.netlifyIdentity) {
//       window.netlifyIdentity.on("init", user => {
//         if (!user) {
//           window.netlifyIdentity.on("login", () => {
//             document.location.href = "/admin/";
//           });
//         }
//       });
//     }
// `,
//   }}></script>
