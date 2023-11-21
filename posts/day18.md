---
title: '個人ブログにキュレーションサイトのような機能をつけてみる'
date: '2023-11-19'
thumbnail: '/images/サムネ18.png'
---

## はじめに
[Day17-Tailwindを利用したサイトデザイン完成](/posts/day17)でデザインは完成したため、勉強しつつ、キュレーションサイトのような機能をつけてみようと思います。  
キュレーションサイトといっても、自分のメモ代わりになれば良いなという軽い気持ちで行います。  

特にWebの記事だと後で読もうと思っても二度と見つけられないという事態がしばしば起きていたので、それらをまとめておくページです。  
今回は特に著作権について意識しながら実装していきました。

## 目次

## Referencesページの作成
まずは、やりたいことを整理しておきます。  
公開メモのような機能なので、  

『参考にしたブログや本を自分なりの一言の感想等をつけて保存できるようする。』  

ガッツリ感想ごと書きたい時は、別途ブログでも書けばいいかなくらいに考えて、このくらいシンプルな機能を実装していきます。

### lib/references.jsonの作成
まずどのようなデータを保存しなくてはいけないかを考えました。  
そして、あまり高度なことは行えないので、簡単にデータ保存ができるJSON形式で保存していくことにしました。

ID、ブログタイトル、サムネイル、URL、一言メモ、カテゴリー  
この辺りがあれば大丈夫かなということで、下記のようなファイルを作成しています。  
将来的には自動化含め考えていきたいなと思っていますが、一旦はまず運用してみてからにします。

```js
[
    {
      "id": "0001",
      "title": "example",
      "thumbnail": "https://example.com/path/to/thumbnail.jpg",
      "url": "https://example.com/",
      "description": "example",
	  "category": "example" 
    }
  ]

```

### lib/references.jsの作成
JSONデータからJavaScriptのオブジェクトへ変換して、ソートする関数(getSortedReferencesData())を作成し、lib/references.jsファイルに記載します。

```js
import fs from 'fs';//fs（ファイルシステム）モジュール。これはNode.jsの組み込みモジュールで、ファイルの読み書きするためのもの。
import path from 'path';//path モジュール.Node.jsの組み込みモジュールで、ファイルパスを操作するためのもの。


//JSONデータを含むファイルからデータを読み込み、そのデータをソートして返す。
export default function getSortedReferencesData() {
  const filePath = path.join(process.cwd(), 'lib', 'references.json');//カレントワーキングディレクトリから、ここへのファイルパスを作成。
  const fileContents = fs.readFileSync(filePath, 'utf8');//パスを同期的に読み込む。
  const references = JSON.parse(fileContents);//読み込んだファイルの内容をJSONとして解析し、JavaScriptのオブジェクトに変換。
  return references.sort((a, b) => {
    return a.id < b.id ? -1 : 1;
  });// 各要素のidプロパティを基準にソートしていく。
}

```

### pages/references.jsの作成
ここは過去のBLOG（posts.js）と同じデザインにしたかったので、コピペしています。  
データソースを変更とカテゴリー欄等は少しいじりましたが、ほとんどコピペで動きました。
```js
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import getSortedReferencesData from '../lib/references'; 

export async function getStaticProps() {
  const allReferencesData = await getSortedReferencesData(); 
  return {
    props: {
      allReferencesData,
    },
  };
}
export default function Reference({ allReferencesData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="text-gray-600 body-font">
        <h1 className="text-3xl font-bold text-center mb-6">
            Reference
        </h1>
        <div className="container mx-auto">
          <ul className="flex flex-wrap -m-4 justify-center">
            {allReferencesData.map(({ id, title, thumbnail, url, description, category }) => (
              <li key={id} className="lg:w-1/3 md:w-1/2 p-4">
                <Link href={url}>
                  <div>
                    <Image
                      src={thumbnail}
                      width={1000}
                      height={400}
                      alt={`Thumbnail for ${title}`}
                      className="w-full h-auto object-cover object-center rounded-lg"
                    />
                    <h3 className="text-lg font-medium text-gray-900 mt-2">{title}</h3>
                    <p className="text-gray-500">{description}</p>
                    <span className="text-sm text-gray-600">カテゴリー：{category}</span> 
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}

```
#### エラーについて
```
Error: Invalid src prop (https://example.com/path/to/thumbnail.jpg) on `next/image`, hostname "example.com" is not configured under images in your `next.config.js`
```
こんなエラーが出てきてしまいましたが、next.configファイルで設定することにより解決しました。

### next.config.jsの作成
next.config.jsを作成し、下記の通り記入すると、しっかりページに画像が表示されるようになります。

```js
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'example.com', // ここに使用している画像のホスト名を追加
        },
        // 必要に応じて他のドメインも追加...
      ],
    },
  };
```

### pages/index.jsの変更
最後に、TOPページ(index.js)にブログセクションと同じようなレイアウトで、表示させるため、pages/references.jsの中身をコピペしています。

## 今後について
昨日考えたことで(2)は完了したため、その他の部分を整えていきます。

(1)プログラミングの勉強  
--過去勉強した時は、さっぱりわかりませんでしたが、今なら少し理解できるかもしれないと思っています。

(2)キュレーションサイトのような機能を追加⇦完了  
--今回自分でwebサイトを作るにあたって、読んだ本や、読んだwebページについて、このサイトにまとめておきたいなと思っています。

(3)各種SNS連携
--せっかく自分でサイトを作ったのだから、各種SNSと連携させたいと思います。  
--例えば、よくある自分のつぶやきをサイトに表示させる機能を追加してみたいです。

(4)デザインを洗練
--なぜか細かいところは気になってしまうので、もっと洗練されたデザインにしていきたいです。

(5)GoogleAdSense(Vercelアップグレード)
--副業にするために、1円でもいいからwebで稼いでみたいです。  
--Vercelのアップグレード（商用利用）が必要なので、(4)まで完了したらかな？と考えています。

## メモ
将来的には自動化したい場所がいくつかある。


## 参考
[ネットの画像や原稿を引用する際の正しい方法【著作権侵害に注意】(https://kigyobengo.com/media/useful/148.html)](https://kigyobengo.com/media/useful/148.html)