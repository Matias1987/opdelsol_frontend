//import Layout from '@/components/layout'
import MyLayout from '@/components/layout/layout'
import '@/styles/globals.css'
import { ConfigProvider, theme } from 'antd'
import { useState } from 'react'



export default function App({ Component, pageProps }) {
  const [isDarkTheme, setDarkTheme] = useState(true)

  return (
      <>  
      <ConfigProvider
      theme={{
        algorithm:  theme.defaultAlgorithm,// isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
        //algorithm: theme.compactAlgorithm,
        token: {
          //// Seed Token
          colorPrimary: "#00502F",//'#007745',//'#00b96b',
          borderRadius: 2,
  
          // Alias Token
          //colorBgContainer: '#f6ffed',
          
        },
        components: {
          Statistic: {
            /* here is your component tokens */
            contentFontSize: 16,
            titleFontSize: 12,
          },
        }
      }}
      >
    { 
      Component.PageLayout ? (<Component.PageLayout displaymodechange={(c)=>{
        setDarkTheme(c)
      }}><Component {...pageProps} /></Component.PageLayout>) : (
      <MyLayout displaymodechange={(c)=>{
        setDarkTheme(c)
      }}>
        <Component {...pageProps} />
      </MyLayout>
    )
    }   
    </ConfigProvider>
      </>
    )
}
