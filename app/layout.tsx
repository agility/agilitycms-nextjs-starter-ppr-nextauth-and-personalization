import { draftMode } from "next/headers"
import PreviewBar from "components/common/PreviewBar"
import SiteFooter from "components/common/SiteFooter"
import SiteHeader from "components/common/SiteHeader"

import { useAgilityContext } from "lib/cms/useAgilityContext"

import { Inter } from "next/font/google"

import "/styles/globals.css"

import { getHeaderContent } from "lib/cms-content/getHeaderContent"
import { redirect } from "next/navigation"
import Script from "next/script"

import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "lib/auth/auth"; // Define auth options in lib/auth.ts
import ClientSessionProvider from "lib/auth/SessionProvider";
import MembersBanner from "components/agility-components/MembersBanner/MembersBanner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { locale, sitemap, isDevelopmentMode, isPreview } = await useAgilityContext()
  const header = await getHeaderContent({ sitemap, locale })

  const session = await getServerSession(authOptions);

  async function startPreviewMode(pathname: string) {
    "use server";

    //turn on draft/preview mode
    (await draftMode()).enable()

    // Redirect to the same page
    let url = `${pathname}`
    if (url.includes("?")) {
      url = `${url}&preview=1`
    } else {
      url = `${url}?preview=1`
    }

    redirect(url)
  }

  return (
    <html lang="en" className={inter.className}>
      <body data-agility-guid={process.env.AGILITY_GUID}>
        <ClientSessionProvider session={session}>
          <div id="site-wrapper">
            <div id="site">
              <PreviewBar
                {...{ isDevelopmentMode, isPreview, startPreviewMode }}
              />

              <div className="flex flex-col min-h-screen">
                <SiteHeader {...{ header }} />

                <main className={`flex-grow`}>{children}</main>
                <SiteFooter />
              </div>
            </div>
          </div>
        </ClientSessionProvider>
      </body>
      <Script src="https://unpkg.com/@agility/web-studio-sdk@latest/dist/index.js" />
    </html>
  )
}
