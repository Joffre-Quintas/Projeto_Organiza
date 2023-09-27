import '@/styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import MenuProvider from '@/context/MenuContext'
import Layout from '@/components/layout'
import UserProvider from '@/context/UserContext'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <UserProvider>
      <MenuProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MenuProvider>
    </UserProvider>
  )
}
