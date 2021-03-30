/**
 * Based on https://github.com/vercel/next.js/blob/canary/examples/with-mdx-remote/pages/posts/%5Bslug%5D.js
 */
import T from 'prop-types'
import fs from 'fs'
import matter from 'gray-matter'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import path from 'path'

const BigLink = (props) => (
  <a className="text-xl color-blue-500" {...props}>
    {props.children}
  </a>
)

const PAGES_PATH = path.join(process.cwd(), 'standalone-pages')
const components = {
  a: BigLink,
}

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
const pageFilePaths = fs
  .readdirSync(PAGES_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path))

const Page = ({ source }) => {
  const content = hydrate(source, { components })
  return (
    <main className="prose mx-auto min-h-screen flex flex-col items-center justify-center">
      {content}
    </main>
  )
}
Page.propTypes = {
  source: T.object,
}

export default Page

export async function getStaticProps({ params }) {
  const postFilePath = path.join(PAGES_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await renderToString(content, {
    components,
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}

export async function getStaticPaths() {
  const paths = pageFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))
  return {
    paths,
    fallback: false,
  }
}
