//import Layout from '@/components/layout'
import MyLayout from '@/components/layout/layout'
import '@/styles/globals.css'
import { ConfigProvider, theme } from 'antd'



export default function App({ Component, pageProps }) {
  

  return (
      <>  
      <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm
        //algorithm: theme.compactAlgorithm,
        /*token: {
          //// Seed Token
          //colorPrimary: '#00b96b',
          //borderRadius: 2,
  
          // Alias Token
          //colorBgContainer: '#f6ffed',
          
        },*/
      }}
      >
    { 
      Component.PageLayout ? (<Component.PageLayout><Component {...pageProps} /></Component.PageLayout>) : (
      <MyLayout>
        <Component {...pageProps} />
      </MyLayout>
    )
    }   
    </ConfigProvider>
      </>
    )
}
