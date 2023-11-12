---
title: 'next.jsでのブログサイト構築について【活動まとめ】'
date: '2023-11-12'
thumbnail: '/images/サムネ11.png'
---

## next.jsで構築するブログサイトのチュートリアル（公式）
[next.jsでブログサイトを構築するチュートリアル(公式・無料)](https://nextjs.org/learn-pages-router/basics/create-nextjs-app)  
プログラミング知識0から、↑このチュートリアルの通りにサイトを構築しています。  
全てはここから↓
```js
terminal
npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/main/basics/learn-starter"
```

## チュートリアルで作成したサイトのカスタマイズについて
### 目次

### 1.ロゴやサムネイルといった画像ファイルの作成
チュートリアルで提供されているロゴは模様のみで、サイトを運営する上でロゴやサムネを整えようと思いましたが、経験がなかったので、最近話題の生成AIに頼ることにしました。

#### 1-1.ChatGPTを使ってロゴ画像生成
詳細は[Day4-サイトロゴの作成について-](/posts/day4.md)で記載していますが、
Chat-GPTには、下記のようなプロンプト（命令文）で画像生成してもらっています。
- 『ブログサイトのロゴを作って欲しい。テーマは平凡な30代男の挑戦』
- 『海に沈む夕日をイメージして』
- 『あまり色を使わないで』
- 『平面的なデザインにして』

![サイトロゴDALL.E1](/images/DALL·E-logo1.png)

![サイトロゴDALL.E2](/images/DALL·E-logo2.png)

甲乙つけ難かったのですが、暫定版と言い訳しつつ、結局今のロゴにしました。
また、画像生成AIはとにかく文字を入れた画像を生成するのが苦手とのことで、何か良い方法はないか調べていると、[Canva：誰でも使えるVisual Suite](https://www.canva.com/ja_jp/)というサイトを発見し、文字はこちらで入れていくことにしました。

【暫定版ロゴ】
![サイトロゴCanva](/images/Logo完成.png)

#### 1-2.Canvaを使ってサムネイル画像生成
ロゴ製作中に[Canva：誰でも使えるVisual Suite](https://www.canva.com/ja_jp/)というサイトを知り、サムネイルを超簡単に作れることがわかりました。
多数のテンプレートが用意されており、Youtubeで見かけるようなサムネイルがとても簡単に作れます。
会社でよく使用するパワーポイントのすごいバージョンだと思っていただければ良いかと思います。
このサイトのサムネイルは全てCanvaを利用して製作したものとなります。  
プログラミングの勉強というよりかは、デザインの勉強に近く、web制作素人にはとても楽しい時間でした。

### 2.Headerのカスタマイズ
コンポーネント（複数回利用するパーツ）を作成をしてみる目的も兼ねて、サイト全体で利用できるようなHeaderを自作してみました。  
チュートリアルでも、コンポーネントを作成しますが、それをカスタマイズするような形です。  
デザインはこれからですが、よくあるサイトロゴと、メニューバーをHeaderコンポーネントに入れました。

このコンポーネントを自作することによって、チュートリアル実行時には理解できていなかったファイルを跨るような処理が少し理解できました。  

```js
components/Header.js
export default function Header() {
  const name = '凡人サラリーマンの副業検証';

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <Image
          priority
          src="/images/背景透過Logo.png"
          height={50}
          width={150}
          alt="Site Logo"
        />
      </div>
      <div className={styles.menuContainer}>
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">これから</Link>
      </div>
    </div>
  );
}
```

Headerコンポーネントを、layout.js(Layoutコンポーネントの一部*チュートリアルで作成)でインポートしています。
```js
components/layout.js
export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />  //★今回自作したコンポーネント（Header）をサイトの前画面で表示させるためのもの
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
```
これでLayoutコンポーネントを例えばHOME画面やブログ画面で利用することができます。  
今後も、今はない【フッター】等を作るときは同じやり方を行えます。

### 3.HOME画面とブログトップ画面の切り分け
現在はブログだけなので困ってはいなかったのですが、将来ブログ以外に例えば【ワーク】等々、ブログと並列の関係の何かを追加したい時に、HOME画面＝ブログトップ画面だと不便だと思い、HOME画面とブログトップ画面を分けることにしました。  
詳細は[day6-Blogトップ画面の作成について](/posts/day6.md)で記載していますが、  
ブログトップ画面はその時点でのHOME画面をそのままコピペしています。  
HOME画面については、最新記事4件だけを表示するようにコードを変更し、ブログトップ画面へのリンクをつけました。
```js
index.js
export async function getStaticProps() {
  const allPostsData = getSortedPostsData().slice(0, 4); // ←.slice(0.4)を入れて4件表示にしただけです。
  return {
    props: {
      allPostsData,
    },
  };
}
```
ブログトップ画面を作ろうと思った時に、どうやって新しいページを作成するのかが全くわかっていませんでした。  
(ブログの投稿記事についてはファイルの名前がidとしてhttps://www.oceanhelplife.com/post/〇〇のように〇〇にidが入っていきます。)

新規のページの作成もとても簡単で、pagesディレクトリに例えば、blog.jsというファイルを作ればhttps://www.oceanhelplife.com/blogで表示されるようになります。

### 4.Markdown形式からHTMLへ変更する際の機能追加
これはかなり厄介でした。  
そもそもMarkdownもHTMLもよく分かっておらず、完全に見切り発車となりました。  
詳細は[day9-コードを見やすくする](/posts/day9.md)で記載していますが、見切り発車失敗しています。

#### 4-1.サムネイルの追加
こちらは特に問題なく、よくあるブログ記事のように、冒頭にサムネイルを表示する方法を学びました。
[day7-サムネイル表示について](/posts/day9.md)

サムネイルということで、下記のようにマークダウンファイルのメタデータとして、画像リンクを指定しています。

チュートリアルで、投稿日やタイトルといったメタデータを、gray-matterというパッケージ(マークダウンファイルやその他のテキストファイルからメタデータを抽出するためのパッケージ)を使用して抽出していたので、投稿日やタイトルと同じように実装しました。

```js
マークダウンのメタデータ
---
title: 'next.jsでのブログサイト構築について【活動まとめ】'
date: '2023-11-12'
thumbnail: '/images/サムネ11.png'
---
```
```js
post.js
<article>
<h1 className={utilStyles.headingXl}>{postData.title}</h1>
<div className={utilStyles.lightText}>
    <Date dateString={postData.date} />
</div>
// ↓このようにサムネイルを表示するようにコードを追加
<Image
    src={postData.thumbnail}
    width={1280}
    height={720} 
    alt={`Thumbnail for ${postData.title}`}
    layout='responsive'
    className={utilStyles.thumbnailImage}
/>        
<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
</article>
```
なんの問題もなく、サムネイルが表示されてホッとしていましたが、問題はコードブロックでした・・・

#### 4-2.コードブロック（シンタックスハイライト適用）
ここで、つまずきました。  
シンタックスハイライト（コード構文に応じた色分け）をしたいと思って、一番最初にトライしたのが、ググってすぐに出てきた【remark-highlight.js】と言うライブラリです。
結局、非推奨ライブラリということもあり、何度見本通りのコードを書いても動きませんでした。
ようやく、仕組みを理解しないと解決できない状態になり、改めて、GitHubで調べながら実装していきました。  
(非推奨というのもGitHubで調べているときに知りました。)

シンタックスハイライトを適用するために下記のプラグインをインストールしています。
- remark-rehype: Markdownの抽象構文木をHTMLの抽象構文木に変換するためのプラグインです。これにより、MarkdownからHTMLへの変換が可能になります。  
- rehype-highlight: HTMLのコードブロックにシンタックスハイライトを適用するためのプラグインです。highlight.jsライブラリを利用して、コードの見た目を美しく表示できます。  
- rehype-stringify: HTMLの抽象構文木を文字列のHTMLに変換するためのプラグインです。これにより、抽象構文木を実際のHTMLコードに変換し、ブラウザで表示可能な形式にします。

インストールしたプラグインを、getPostData()で利用できるようにします。
```js
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  //↓追記した箇所
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
```

これで、Markdown形式→HTMLへ変換するときに、class属性にid＝hljsが付与されます。

最後に、
[highlight.js](https://highlightjs.org/examples)でサンプルを確認して、Downloadします。  
私は【github-dark】というテーマがぱっと見で綺麗だなと思ったので、そちらを選びました。
ダウンロードしたテーマのcssファイルを_app.jsでインポートして、完成となります。

#### 4-３.目次の作成
まずは目次を作るための2つのプラグインをインストールします。
- rehype-slug：　HTML見出し要素に自動的にIDを追加
- remark-toc：　Markdownコンテンツから目次を生成

そして、getPostData()を更新して、Markdownファイルの見出しを表示させたい箇所に【##目次】という見出しを書けば完了となります。
```js
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkToc, { heading: '目次' })  // 目次として扱う見出しを指定
    .use(remarkRehype)
    .use(rehypeSlug)　//見出しにidを付与
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
```

## 今後について
明日は、1ヶ月半経過したプログラミング学習において思うところを書きたいと思います。  
来週はCSSでサイトの見た目を整えることを目指します。

## メモ
振り返ると小さな成長ですが、ちゃんとできていると実感できる。


## 参考
特になし。過去ブログ。
