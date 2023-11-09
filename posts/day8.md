---
title: 'サムネイル表示について（HOME/BLOGトップ画面）【Day8】'
date: '2023-11-09'
thumbnail: '/images/サムネ8.png'
---

## Imageコンポーネントと、imgタグについて
HOMEやBLOGトップ画面にサムネイルを表示させる方法を調べている時に気がついたのですが、[Day7](/posts/day7.md)で行った方法も間違えではないようなのですが、もっと良い方法がありました。  
プログラミングの勉強も兼ねているので、変更しておきます。  

### 変更理由について（タグとコンポーネント）
Next.jsでは、特にパフォーマンスや最適化を考慮する場合に<Image>コンポーネントの使用が推奨されます。  
([Day7](/posts/day7.md)で実装したものは<img>タグとなります。)

コンポーネントのメリットと、タグのメリットは下記の通りです。
#### <Image>コンポーネントメリット
1. Next.jsの<Image>は自動的に画像を最適化し、ロード時間を短縮するために必要なサイズにリサイズする
2. 画面に表示されるまで画像の読み込みを遅延させ、パフォーマンスを向上させる
3. WebPのような最新の画像フォーマットに自動的に変換し、ブラウザの対応状況に基づいて最適なものを提供する
4. 複数の画像サイズを生成し、デバイスの画面サイズに応じて適切な画像を提供する
5.  widthとheightが必須となるが、レイアウト崩れを防げる

#### <img>タグのメリット
1. <img>タグはHTMLの標準的な要素であり、どのようなWeb開発環境でも動作する
2. 特別な属性を必要とせず、src, alt, width, heightなどの基本的な属性のみで使用できる
3. CSSやJavaScriptを使って直接操作したい場合に便利


#### [id].js変更前
```js
<div className={utilStyles.lightText}>
    <Date dateString={postData.date} />
</div>
<img src={postData.thumbnail} alt={`Thumbnail for ${postData.title}`} />　←★今回追記するもの
```

#### [id].js変更後
```js
import Image from 'next/image'

<Image
    src={postData.thumbnail}
    width={1280}
    height={720} 
    alt={`Thumbnail for ${postData.title}`}
    layout='responsive'
    className={utilStyles.thumbnailImage}
/>   
```

上記のコードで、タグからコンポーネントに変更ができます。

## サムネイル表示について（HOME/BLOGトップ画面）
ここからが本題ですが、HOME(index.js)と、Blogトップ(blog.js)の変更方法は非常にシンプルで簡単でした。
まずはHOME(index.js)を変更してみます。

### HOME(index.js)変更前
```js
<ul className={utilStyles.list}>
    {allPostsData.map(({ id, date, title }) => (
    <li className={utilStyles.listItem} key={id}>
        <Link href={`/posts/${id}`}>{title}</Link>
        <small className={utilStyles.lightText}>
        <Date dateString={date} />
        </small>
    </li>
    ))}
</ul>
```

### HOME(index.js)変更後
```js
import Image from 'next/image'←追記

<ul className={utilStyles.list}>
    {allPostsData.map(({ id, date, title, thumbnail }) => (
    <li className={utilStyles.listItem} key={id}>
        <Link href={`/posts/${id}`}>　
            <Image　　　←★今回はここを変更
            src={thumbnail}
            width={1280}
            height={720} 
            alt={`Thumbnail for ${title}`}
            layout='responsive'
            className={utilStyles.thumbnailImage}
            />
            <h3 className={utilStyles.headingLg}>{title}</h3>
        </Link>
        <br />
        <small className={utilStyles.lightText}>
        <Date dateString={date} />
        </small>
    </li>
    ))}
</ul>
```

### ブログのトップ画面について
HOMEと同じコードなので、そのままコピペします。

### 表示の確認



復習目的で、コードの意味を再確認しておきます。  
各投稿データからHTMLのリスト項目を生成
- ul (unorderd list):　序列なしのリスト作成（HTML）　
- className：　CSSスタイルを適用するための属性(class属性の代わり)
- allPostsData: 各ブログの投稿データを格納している配列
- .map()関数：　配列の各要素(今回はid, date, title, thumbnail)に対して関数を適応させ、結果として新しい配列をリターン
- ({ id, date, title, thumbnail }) => { ... }:　アロー関数+ストラクチャリングで、...にはそれぞれの投稿データを使用して実行したい処理を記述(今回の場合はリスト項目を生成するJSXを記述)

## 今後について
昨日、やりたいと思ってメモをしていた内容で、一番上に記載した、投稿記事にサムネイルをつける。というものは達成しました。
続いて、一旦デザインは置いといて、トップ画面にサムネを反映させるようにしていきたいと思います。
- 投稿記事にサムネイルをつける。←達成。
- BlogやHOMEのトップ画面に、サムネイル+タイトル（記事リンクを埋め込む）を表示させる。
- CSSについて、現在、/styles/Home.module.cssと/components/layout.module.cssの二つに跨っている。この理由を理解する。

## メモ
JSX
- HTMLタグと同様の構文を使ってReact要素を記述
- JavaScriptの式を {} で囲むことで埋め込むことができる
- コンポーネントもHTMLタグのように記述でき、再利用可能なUIの部品を作ることができる

```js
const element = <h1>Hello, world!</h1>;
↓Babelにって標準的なJavaScript関数呼び出しに変換される
const element = React.createElement('h1', null, 'Hello, world!');
```

デストラクチャリング  
JavaScriptの式であり、配列やオブジェクトからデータを取り出し、それらを個別の変数に展開する
```js
const person = {
  name: 'Alice',
  age: 25
};

// デストラクチャリングを使わない場合
const name = person.name;
const age = person.age;

// デストラクチャリングを使う場合
const { name, age } = person;
```


Vercelの無料プランは商用利用禁止・・・  
[Node.jsに対応しているレンタルサーバーはある？国内・外のホスティングサービスをリサーチ](https://tomato-code.com/4128/)  
[Vercelとは？概要や料金、無料プランについて](https://dev-harry-next.com/infrastructure/vercel-detail)  
アフィリエイト等をしようと思ったら、有料プラン（20ドル/月）へアップグレードが必要・・・  
(うーーーん・・・アフィリエイトで月3,000円稼がないと赤字か・・・)

サムネを作る時に[Canva](https://www.canva.com/ja_jp/)が面白い。  
ふざけて時間が過ぎるのが残念なので遊びすぎないようにする。

# 参考文献
特になし。
