import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';


export default function About() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
        <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
          <h1 className='text-center text-2xl font-bold text-gray-800 md:mb-6'>お問い合わせ入力フォーム</h1>
          <p className='text-center text-xs font-bold text-gray-800 md:mb-6'>このサイトに関する不備やご不明点等ありましたら、お気軽にお問い合わせください。</p>
          <form action="https://ssgform.com/s/qgRXKzoTetz6" method="post">
          <h4>お名前</h4>
          <input type="text" name="お名前" required="required" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
          <h4>メールアドレス</h4>
          <input type="email" name="メールアドレス" required="required" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"/>
          <h4>お問い合わせ内容</h4>
          <textarea name="お問い合わせ内容" required="required" className='h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"'></textarea>
          <div></div>
          <button type="submit" className='inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base'>送信する</button>
          </form>
        </div>
    </Layout>
  );
}