//import Layout from '@/components/layout'
import MyLayout from '@/components/layout/layout'
import '@/styles/globals.css'
import { ConfigProvider, theme } from 'antd'
import { useState } from 'react'
import es_ES from 'antd/locale/es_ES'
import moment from 'moment'
import dayjs from "dayjs";
import "dayjs/locale/es";
import { SocketProvider } from '@/components/etc/SocketProvider'
import SocketStatus from '@/components/etc/SocketStatus'

export default function App({ Component, pageProps }) {
  const [isDarkTheme, setDarkTheme] = useState(true)
  moment.locale("es")
  dayjs.locale("es")
  moment.updateLocale('en', {
    weekdaysMin : ["Dom", "Lun", "Mar", "Mier", "Thu", "Fri", "Sat"]
  });
  return (
      <>  
      {/*<SocketProvider>*/}
      <ConfigProvider
      locale={es_ES}
      
      theme={{
        algorithm:  theme.defaultAlgorithm,// isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
        //algorithm: theme.compactAlgorithm,
        token: {
          //// Seed Token
          colorPrimary: "#663F4C", //"#312EB4",// "#FF9900",//"#0052C4",//"#00502F",//'#007745',//'#00b96b',
          borderRadius: 2,
          colorLink: "#8E3754",
          // Alias Token
          colorBgContainer: "#FFFFFF",// '#f6ffed',
          
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
    {/*</SocketProvider>*/}
      </>
    )
}
