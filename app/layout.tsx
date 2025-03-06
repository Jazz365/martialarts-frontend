import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppProviders from "@/contexts";
import NextTopLoader from "nextjs-toploader";
import 'rc-rate/assets/index.css';
import 'react-calendar/dist/Calendar.css';
import "react-multi-carousel/lib/styles.css";
import "react-datepicker/dist/react-datepicker.css";

import { Toaster } from "sonner";
import Script from "next/script";

const mako = localFont({
  src: "./fonts/Mako/Mako-Regular.ttf",
  variable: "--mako-font",
  weight: "500 600 700 800 900",
});

const poppins = localFont({
  src: [
    {
      path: "./fonts/Poppins/Poppins-Thin.ttf",
      style: "normal",
      weight: "100",
    },
    {
      path: "./fonts/Poppins/Poppins-Light.ttf",
      style: "normal",
      weight: "300",
    },
    {
      path: "./fonts/Poppins/Poppins-Regular.ttf",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--poppins-font",
});

export const metadata: Metadata = {
  title: "Best Place For Learning Martial Arts With The Martial Arts Experts",
  description: "Train with the best martial arts experts! Martial Arts Guru lets you find and register for top martial arts classes online. Start your training now!",
  authors: [
    { 
      name: 'Ayoola Oloyede', 
      url: 'https://github.com/Josh-Ay', 
    },
  ],
  keywords: [
    'best martial arts', 'martial arts classes', 'judo classes', 'judo school', 'judo dojo', 'karate classes', 
    'karate school', 'muay thai', 'muay thai classes', 'kickboxing school', 'kickboxing classes', 'best online kickboxing classes', 
    'mixed martial arts classes', 'mixed martial arts classes online', 'brazilian jiu jitsu classes', 'boxing classes'
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="google-site-verification" content="9d_ck3aA0w2sGLFx3B-o7yYOfJ4iKmfQxGWcw5fzC6o" />
        
        {/* Live Chatbot */}
        <script>
          {`
            window.__lc = window.__lc || {};
            window.__lc.license = 19010627;
            window.__lc.integration_name = "manual_channels";
            window.__lc.product_name = "livechat";
            ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
          `}
        </script>

        <Script 
          type="application/ld+json"
          strategy='afterInteractive'
          id="seo-search-strategy"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "WebSite",
              "name": "Martial Arts Guru",
              "url": "https://martialarts.guru/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "{search_term_string}",
                "query-input": "required name=search_term_string",
              },
            })
          }}
        />

        {/* Google analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-P17D8BM0DM"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-P17D8BM0DM');
            `,
          }}
        />
      </head>
      
      <body className={`${mako.variable} ${poppins.variable}`}>
        <AppProviders>
          <NextTopLoader color={'var(--primary-app-color)'} showSpinner={false} />
          <Toaster />
          {children}
        </AppProviders>

        <noscript>
          <a href="https://www.livechat.com/chat-with/19010627/" rel="nofollow">Chat with us</a>, powered by <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a>
        </noscript>
      </body>
    </html>
  );
}
