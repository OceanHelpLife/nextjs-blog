---
title: 'コードを見やすくする'
date: '2023-11-10'
thumbnail: '/images/サムネ9.png'
---

目次

## コードを見やすくする
調べてもなんて言えば良いのかはわかりませんでしたが、コードスニペットがシンタックスハイライトされてブログの本文中に表示されるような機能を作りたいと思います。  
＊コードスニペット：　コードの断片（変更箇所のみを表示させる）  
＊シンタックスハイライト：　コードの構文に応じた色分け  

サンプル↓
```js
console.log('Hello, world!');
```

### 方法について
next.jsでサイトを構築している場合、チュートリアル通りに進めると、マークダウン形式で各ブログ投稿の内容を保存していきます。
最初、調べながらMarkdown処理ライブラリの【remark-highlight】を使用していましたが、うまくいかず・・・
調べると【rehype-highlight】に変更するべきというものを見つけたので、その通り実装しています。

具体的には、
1. remark-rehype、rehype-highlight、rehype-stringifyのインストール
2. getPostData()関数の更新
3. CSSスタイルの適用

こちらを行うと、コードブロックが、いい感じに表示されるようになります。

### 1.remark-rehype、rehype-highlightのインストール
こちらは特に問題なく、ターミナルで下記の通りインストールすれば完了です。  
```js
% npm install remark-rehype rehype-highlight rehype-stringify unified
```
インストールする目的はそれぞれ下記の通りです。
- remark-rehype: Markdownの抽象構文木をHTMLの抽象構文木に変換するためのプラグインです。これにより、MarkdownからHTMLへの変換が可能になります。  
- rehype-highlight: HTMLのコードブロックにシンタックスハイライトを適用するためのプラグインです。highlight.jsライブラリを利用して、コードの見た目を美しく表示できます。  
- rehype-stringify: HTMLの抽象構文木を文字列のHTMLに変換するためのプラグインです。これにより、抽象構文木を実際のHTMLコードに変換し、ブラウザで表示可能な形式にします。

この辺りの仕組みについては、[Next.js のための Remark / Rehype 入門](https://qiita.com/sankentou/items/f8eadb5722f3b39bbbf8)にとてもわかりやすく書いてありました。  
*ただし、2023年現在では本文中記載の【remark-highlight.js】は推奨されていません。

### 2.getPostData()関数の更新
getPostData()関数は、指定されたMarkdownファイルの内容をHTMLに変換し、その他のメタデータと共に返すことで、ブログ投稿やウェブページのコンテンツを動的に生成するために使用していました。

#### getPostData()変更前
```js
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();
    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}
```
#### getPostData()変更後
```js
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
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
インストールしたプラグインを使用できるようになりました。
これで、サンプルを検証ツールで確認すると、しっかりとclassに属性(hljs)が表示されるようになりました。  
サンプル↓
```js
console.log('Hello, world!');
```
![hljsの確認](/images/class-hljs.png)  

### CSSスタイルの適用
最後にCSSスタイルをあてていきます。
[highlight.js]（https://highlightjs.org/examples）でサンプルを確認して、Downloadします。  
私は【github-dark】というテーマがぱっと見で綺麗だなと思ったので、そちらを選びました。
ダウンロードしたテーマのcssファイルを_app.jsでインポートして、完成！

## 今後について
次は、目次機能を整える。

## メモ
[Next.js のための Remark / Rehype 入門](https://qiita.com/sankentou/items/f8eadb5722f3b39bbbf8)が初学者にも分かりやすく仕組みを解説。
Legacyと言われる、現在使用が推奨されていないやり方で進めていても、個人学習だと気付くのが難しいなと実感した1日でした。  
【remark-highlight】をその通りにコピペしても動かない⇨なぜ？⇨いろいろと調べる。⇨やっぱりコードは合っていそう⇨調べる⇨わからない・・・というような状態で2時間くらい辛い時間を過ごしました。  
調べ方みたいなのも上手になるのか、やっぱりこういうのはちゃんとメンターみたいな人を探す必要があるのか・・・  
スクール高いから独学が良いんだけれど・・・


## 参考文献
[Next.js 13のnext/image（next/future/image）へ移行する](https://ebisu.com/note/next-image-migration/)  
[Next.js のための Remark / Rehype 入門](https://qiita.com/sankentou/items/f8eadb5722f3b39bbbf8)