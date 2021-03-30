import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        {/**
          TODO:: Insert common things here.
        */}
        <Head>
          <meta
            name="description"
            content="A Netlify CMS && Next.js starter"
          />
        </Head>
        <body className="bg-blue-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
