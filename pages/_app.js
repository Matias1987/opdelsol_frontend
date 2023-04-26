//import Layout from '@/components/layout'
import MyLayout from '@/components/layout/layout'
import '@/styles/globals.css'



export default function App({ Component, pageProps }) {
  

  return (
      <>
    { 
      Component.PageLayout ? (<Component.PageLayout><Component {...pageProps} /></Component.PageLayout>) : (
      <MyLayout>
        <Component {...pageProps} />
      </MyLayout>
    )
    }   
      </>
    )
}
