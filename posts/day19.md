---
title: 'About（問い合わせ）ページの作成'
date: '2023-11-27'
thumbnail: '/images/サムネ19.png'
---

## はじめに
将来Googleアドセンスの審査を受けようと考えているため、[Googleアドセンスの審査に通りやすいサイトの特徴・設置の流れ(https://shared.gmocloud.com/lp/iinkai/adsense/)](https://shared.gmocloud.com/lp/iinkai/adsense/)こちらのサイトを参考にしつつ、About(お問い合わせ)ページを作成することにしました。  

完成イメージ  
![完成イメージ](/images/sozai4.png)

## 目次

## 利用サービスの選定
お問い合わせフォームを実装するために、いくつかの方法がありますが、  
無料かつプログラミング初学者にも簡単な方法を心がけました。  

利用しようと思っていたSendGridというサービスが個人利用不可だったため、今回は、SSGformというサービスを利用することにしました。  
[SSGform(https://ssgform.com/with/next)](https://ssgform.com/with/next)

## SSGformの登録
こちらはとても簡単で、メールアドレスが一つあれば、即時アカウント作成完了となります。  
無料プランは月間100回までの問い合わせという上限はありますが、まず100回も問い合わせくることはないので問題ありません。  

アカウント発行後、フォーム＋追加というボタンをクリックすると、HTMLに記載する送信先URLが発行されます。

## pages/about.jsの作成
こちらの技術記事を参考にしながら、about.jsを下記のように記載しました。  
[【Next.js】React-Hook-FormとSSGformを使ったお問い合わせフォーム作成【フォーム送信】](https://qiita.com/SyoInoue/items/561b2a22a53a482c9654)  

また、[Flowrift](https://flowrift.com/)でFormのtailwindテンプレートを参考にしています。

```js
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
          
          //<form>タグの action属性に発行されたURLを入れて、 method属性にpost
          //action 属性は、フォームが送信されたときにデータを処理するサーバーサイドスクリプトのURLを指定
          //method 属性は、フォームデータをサーバーに送信する方法を指定。一般的な方法は GET と POST

					//required属性で、必須項目を設定。
          
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

```

## 完成
テストしてみると完成しています。

## 今後について
Aboutページの整理。  
SNS連携

## メモ
HTMLがすごい。
マークアップ言語で、プログラミング言語ということで、全然勉強していなかったが、```<form>```タグとかサーバーサイドURLの処理とか、今までで一番プログラミングっぽいことをやった。

## 参考
[Googleアドセンスの審査に通りやすいサイトの特徴・設置の流れ(https://shared.gmocloud.com/lp/iinkai/adsense/)](https://shared.gmocloud.com/lp/iinkai/adsense/)  
[SSGform(https://ssgform.com/with/next)](https://ssgform.com/with/next)  
[【Next.js】React-Hook-FormとSSGformを使ったお問い合わせフォーム作成【フォーム送信】(https://qiita.com/SyoInoue/items/561b2a22a53a482c9654)  ](https://qiita.com/SyoInoue/items/561b2a22a53a482c9654)  
[Flowrift(https://flowrift.com/)  ](https://flowrift.com/)  