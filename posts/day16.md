---
title: 'Tailwindテンプレートを利用したトップページデザイン'
date: '2023-11-17'
thumbnail: '/images/サムネ16.png'
---

## はじめに
[Day14-Tailwindテンプレートについて(TOPページ)](/posts/day14)と[Day15-Tailwindテンプレートについて(ブログ記事ページについて)](/posts/day15)でTailwindのテンプレートを利用して、トップページとブログ記事のレイアウトを作ることができたので、いよいよすでに動かしているトップページにクラスを当てはめていきます。

## 目次

## トップページの機能の復習(index.js)
まず、コンポーネントを整理しておきます。  
Layoutコンポーネントの中に、Headerコンポーネントを入れています。  
```js
layout.js
import Head from 'next/head';
import Header from './Header';  
import Link from 'next/link';

export const siteTitle = '凡人サラリーマン(奮闘中)';

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
      <main>{children}</main>
      {!home && (
        <div className="mt-4">
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
```
```js
import Image from 'next/image';

export default function Header() {
  return (
    <div className="mt-4">
      <Image     
        src="/images/トップ画.png"
        width={1280}
        height={720} 
        alt="Site TOP IMAGE"
        sizes='100vw'
        style={{
          width: '100%',
          height: 'auto'
        }}  
      />
    </div>
  );
}
```

トップページで、ヘッダーやレイアウトにデザインをするのは簡単そうですが、  
↓このブログのサムネ等を表示しているところは大変そうですね・・・
```js
<section className="">
<h1 className="">
    <Link href="/posts">
    Blog
    </Link>
</h1>
<ul>
    {allPostsData.map(({ id, date, title, thumbnail }) => (
    <li key={id}>
        <Link href={`/posts/${id}`}>
            <small className="">
            <Date dateString={date} />
            </small>
            <Image
            src={thumbnail}
            width={1280}
            height={720} 
            alt={`Thumbnail for ${title}`}
            className=""
            sizes='100vw'
            style={{
                width: '100%',
                height: 'auto'
            }}    
            />                 
            <h3 className="">{title}</h3>
        </Link>
    </li>
    ))}
</ul>
<Link href="/posts">more(Blog一覧を表示)</Link>
</section>
```

## トップページのデザイン
まずは、Headerコンポーネント、次にLayoutコンポーネント、最後にブログ紹介セクションの順番に変えていきます。

### Headerコンポーネント
2点、テンプレートに変更を加えています。  
- <svg>タグ → next.jsの<Image>コンポーネントへ変更
- <a>タグ → next.jsの<Link>コンポーネントへ変更

なんとなーーくnext.jsのコンポーネントを使っている方が勉強になるかなという気持ちがあるので可能な限り使っていきます。
```js
//Header.js【変更後】
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return <>
  <header className="text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <Image 
        src="/images/sozai1.png" 
        width={50}        
        height={50}       
        className="text-white p-2 rounded-full" 
        alt="Logo"
      /> 
      <span className="ml-3 text-xl">OceanHelpLife</span>
    </Link>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <Link href="/" className="mr-5 hover:text-gray-900">HOME</Link>
      <Link href="/posts" className="mr-5 hover:text-gray-900">BLOG</Link>
      <Link href="/about" className="mr-5 hover:text-gray-900">準備中</Link>
      <Link href="/works" className="mr-5 hover:text-gray-900">準備中</Link>
    </nav>
  </div>
</header>
</>
}
```
### Layoutコンポーネント
変更が必要なのは主に↓ここだけです。
```js
      <main>{children}</main>
      {!home && (
        <div className="mt-4">
          <Link href="/">← Back to home</Link>
        </div>
```
```js
      <main className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">{children}</main>
      {!home && (
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link href="/">← Back to home</Link>
        </div>
```
テンプレートからのクラス名コピペで、サクッと終わりました。

### TOPページのメインについて
やはりここで苦戦しました。  
#### 苦戦ポイント  
- インラインボックスとブロックボックスの違い
- テンプレートとの違い

まず、CSSについてちゃんと勉強したことがなかったので、<a>タグに翻弄されました。  
なかなか答えに辿り着かなかったんですが、結局、className = "block"とするだけでした。
HTML要素には、インラインボックスとブロックボックスという２種類があるようで、インラインボックスは幅（width）や高さ（height）を指定できないそうです。  
[今更聞けない！エンジニアのための CSS の基礎講座 〜ボックスモデル編〜](https://nulab.com/ja/blog/nulab/css-basics-for-engineer-boxmodel/)  

また、<ul>と<li>タグについては、テンプレートでは単純な繰り返しだったため、どのように適用すればいいのかがよく分かりませんでした。
何度も、tailwindのクラス名を適用するタグを変えてみたり、少し変更を加えてみたり、新規の<div>タグを追加してみたり等々かなり時間がかかってしまいました。  
結果的にはうまくいき、少しCSSについての理解も深まったので、良しです。
```js
//index.js
      <section className="text-gray-600 body-font">
        <h1 className="text-3xl font-bold text-center mb-6">
          <Link href="/posts">
            Blog
          </Link>
        </h1>
        <div className="container mx-auto">
          <ul className="flex flex-wrap -m-4 justify-center">
            {allPostsData.map(({ id, date, title, thumbnail }) => (
              <li key={id} className="lg:w-1/3 md:w-1/2 p-4">
                <Link href={`/posts/${id}`}>
                    <small className="text-gray-500">
                      <Date dateString={date} />
                    </small>
                    <Image
                      src={thumbnail}
                      width={960}
                      height={540} 
                      alt={`Thumbnail for ${title}`}
                      className="w-full h-auto object-cover object-center rounded-lg"
                    />                 
                    <h3 className="text-lg font-medium text-gray-900 mt-2">{title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <Link href="/posts" className='block border gray-300'>more(Blog一覧を表示)</Link>
        </div>
      </section>
```
![トップページ画像](/images/sozai2.png)

## 今後について
明日はブログトップページとブログ記事ページのデザインをしていきます。  
また、ABOUTページを作ろうと思いました。  
将来的にはXやYoutube等と連携させるようにしたいなぁと何となく考えています。

## メモ
フッターも簡単なものを作る。  
トップページの自己紹介が不要。  
Aboutページでも作って、終了させる。  
将来的には各種SNSで代替させる。  

## 参考
[【React/Next.js】「export default」と「export」の違い](https://zenn.dev/seetsuko/articles/f378bf513d6231)  
[今更聞けない！エンジニアのための CSS の基礎講座 〜ボックスモデル編〜](https://nulab.com/ja/blog/nulab/css-basics-for-engineer-boxmodel/)