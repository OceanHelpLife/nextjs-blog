import Head from 'next/head';
import Header from './Header';  
import Footer from './Footer';

export const siteTitle = '凡人サラリーマン(副業奮闘中)';

export default function Layout({ children, home }) {
  return (
    <div className="">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9301397476226289" crossorigin="anonymous"></script>
        <meta
          name="description"
          content="時間と場所にとらわれない働き方を模索していく体験記、アフィリエイトやweb制作等の検証を行う"
        />
        <meta property="og:image" content="https://www.oceanhelplife.com/images/sozai1.png" />
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
