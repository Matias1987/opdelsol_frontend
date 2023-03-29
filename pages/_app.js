//import Layout from '@/components/layout'
import MyLayout from '@/components/layout'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (<MyLayout><Component {...pageProps} /></MyLayout>)
}
