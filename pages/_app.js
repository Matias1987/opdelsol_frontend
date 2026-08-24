//import Layout from '@/components/layout'
import MyLayout from "@/components/layout/layout";
import "@/styles/globals.css";
import { ConfigProvider, theme } from "antd";
import { useState } from "react";
import es_ES from "antd/locale/es_ES";
import dayjs from "dayjs";
import "dayjs/locale/es";
import updateLocale from "dayjs/plugin/updateLocale";
//import { SocketProvider } from '@/components/etc/SocketProvider'
//import SocketStatus from '@/components/etc/SocketStatus'
export default function App({ Component, pageProps }) {
  const [isDarkTheme, setDarkTheme] = useState(true);
  //moment.locale("es");
  //dayjs.locale("es");
  //moment.updateLocale("en", {
  //  weekdaysMin: ["Dom", "Lun", "Mar", "Mier", "Thu", "Fri", "Sat"],
  //});

  // 1. Activate the updateLocale plugin
  dayjs.extend(updateLocale);

  // 2. Set global locale to Spanish
  dayjs.locale("es");

  // 3. Update the English locale configuration
  dayjs.updateLocale("en", {
    weekdaysMin: ["Dom", "Lun", "Mar", "Mier", "Thu", "Fri", "Sat"],
  });

  return (
    <>
      {/*<SocketProvider>*/}

      <ConfigProvider
        locale={es_ES}
        theme={{
          algorithm: theme.defaultAlgorithm, // isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
          //algorithm: theme.compactAlgorithm,
          token: {
            //// Seed Token
            colorPrimary: "#3a5c79", //"#663F4C", //"#312EB4",// "#FF9900",//"#0052C4",//"#00502F",//'#007745',//'#00b96b',
            borderRadius: 2,
            colorLink: "#2c3e4e", //"#8E3754",
            // Alias Token
            colorBgContainer: "#FFFFFF", // '#f6ffed',
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;",
          },
          components: {
            Tabs: {
              // Enhancing the active card tab styles
              cardActiveBg: "#e6f7ff", // Light blue background for active tab
              itemActiveColor: "#b30000", // Darker, high-contrast text color
              itemSelectedColor: "#b35100", // Color when selected
              titleFontSize: 16, // Make active/inactive font slightly larger
              fontWeightStrong: 700
            },
            Statistic: {
              /* here is your component tokens */
              contentFontSize: 16,
              titleFontSize: 12,
            },
            Menu: {
              /* General structural sizing */
              horizontalLineHeight: "32px", // Low-profile slim height
              fontSize: 15, // Crisp, micro typography
              /* Dark Background Palette */
              colorBgContainer: "#DDDDDD", // Deep slate dark background

              /* Horizontal specific item styling
              horizontalItemBorderRadius: 2, */

              /* Light/White text variables for Dark Theme */
              horizontalItemColor: "#DDDDDD", // Muted silver text/icons
              horizontalItemHoverColor: "#ffffff", // Crisp white text on hover
              horizontalItemHoverBg: "#b4b4b4", // Soft slate glow behind hover

              /* Selected active tab state */
              horizontalItemSelectedColor: "#ffffff", // Crisp white text when active
              horizontalItemSelectedBg: "#b3b3b3", // Discrete gray tint behind active item
            },
          },
        }}
      >
        {Component.PageLayout ? (
          <Component.PageLayout
            displaymodechange={(c) => {
              setDarkTheme(c);
            }}
          >
            <Component {...pageProps} />
          </Component.PageLayout>
        ) : (
          <MyLayout
            displaymodechange={(c) => {
              setDarkTheme(c);
            }}
          >
            <Component {...pageProps} />
          </MyLayout>
        )}
      </ConfigProvider>
      {/*</SocketProvider>*/}
    </>
  );
}
