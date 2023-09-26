import Layout from '@/components/layout'
import { Html, Head, Main, NextScript } from 'next/document'
import {} from 'tailwindcss'
export default function Document() {
  return (
    <Html lang="pt-br">
      <Head />
      <body>
        <Layout>
          <Main />
          <NextScript />
        </Layout>
      </body>
    </Html>
  )
}
