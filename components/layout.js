import Head from 'next/head';
import Header from './Header';  
import Link from 'next/link';
import Footer from './Footer';

export const siteTitle = '凡人サラリーマン(副業奮闘中)';

export default function Layout({ children, home }) {
  return (
    <div className="">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="時間と場所にとらわれない働き方を模索していく体験記、アフィリエイトやweb制作等の検証を行う"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(siteTitle)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <main className="container px-5 py-10 mx-auto">{children}</main>
      {/* {!home && (
        <div className="justify-center" >
          <Link href="/">← Back to home</Link>
        </div>
      )} */}
      <Footer />
    </div>
  );
}
