---
title: 'Tailwindを利用したサイトデザイン完成'
date: '2023-11-18'
thumbnail: '/images/サムネ16.png'
---

## はじめに
[Day16-Tailwindを利用したサイトデザイン](/posts/day16)で実際のトップページにTailwindでレイアウトを整えてみました。  
次はブログの記事コンテンツのデザインをおこないます。  
調べてみると、ざっくり２種類の方法があるようでして、今回は簡単にできる、global.cssへ記載する方法でデザインしていきます。

## 目次

## マークダウン形式→HTML変換時にクラス名を付与する（参考）
冒頭記載したように、global.cssへ直接記載する方法を選んだので、実証していませんが、rehypeにカスタムプラグインを追加して、変換プロセス中に特定の要素（例えば<img>タグ）にクラスを付与する方法があるようです。  
ただ、プラグイン等はトラウマがあるので、もう少し理解が深まってから使いたいと思います・・・  
試していないのですが、調べたところ下記のようなコードで動くみたいです。(真偽不明ですが。。。)
```js
import { visit } from 'unist-util-visit';

function addTailwindClassesToImages() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        node.properties.className = ['tailwind-class-1', 'tailwind-class-2']; // ここに必要なクラスを追加
      }
    });
  };
}

// 使用方法
const processedContent = await unified()
  .use(remarkParse)
  .use(remarkToc, { heading: '目次' })
  .use(remarkRehype)
  .use(addTailwindClassesToImages) // カスタムプラグインを追加
  .use(rehypeSlug)
  .use(rehypeHighlight)
  .use(rehypeStringify)
  .process(matterResult.content);

```

## global.cssへ直接記載
今回はglobal.cssへ直接記載していくことにしました。  
というのも、ブログ記事ページでは、  
```
・見出し <h1><h5>
・目次 <ul><li>  
・リンク <a>  
・引用 <blockquote>  
・画像<img>
```

くらいしか今のところ使っておらず、```<ul><li>```が入れ子になっているところは少し難しかったですが、基本的に超簡単に思い通りのデザインができました。  
一応、将来変える可能性含め、考慮した点もあります。(後述する優先順位と@applyディレクティブ)

```js
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-orange-50;
}
h1 {
  @apply text-3xl font-bold text-gray-800 mt-4;
}
h2 {
  @apply text-2xl font-semibold text-gray-700 border-l-4 border-gray-700 pl-2 mt-4 mb-2;
}
h3 {
  @apply text-xl font-semibold text-gray-700 border-l-4 border-gray-700 pl-2 mt-4;
}
h4 {
  @apply text-lg font-medium text-gray-700 border-l-4 border-gray-700 pl-2 mt-4;
}
h5 {
  @apply text-base font-medium text-gray-700 border-l-4 border-gray-700 pl-2 mt-4;
}
ul {
  @apply list-none bg-orange-100;
}
ul > li {
  @apply mb-2;
}
ul ul {
  @apply pl-4 mt-2;
}
ul ul > li {
  @apply text-sm text-orange-600;
}
ul ul ul {
  @apply pl-4 mt-1;
}
ul ul ul > li {
  @apply text-xs text-orange-500;
}
ul ul ul ul {
  @apply pl-4 mt-1;
}
ul ul ul ul > li {
  @apply text-xs text-orange-400;
} 
a {
  @apply text-blue-600 hover:text-blue-800 transition duration-300;
}
blockquote {
  @apply italic border-l-4 border-gray-400 pl-4 my-4;
}
img {
  @apply w-full h-auto object-cover object-center rounded-lg
}
```

### CSSの優先順位
1.インラインスタイル: HTML要素に直接適用されたスタイルが最も優先されます。  
2.IDセレクタ: IDを使用したスタイルが次に優先されます。  
3.クラス/属性/擬似クラスセレクタ: これらのセレクタは、次に強い優先度を持ちます。  
4.要素セレクタ: 最も一般的なセレクタで、他のより具体的なセレクタに比べ優先度が低いです。  

上記の通り、CSSの優先順位は、基本的に特定性（Specificity）というルールに従うようです。  
今回global.cssに記載したのは一番優先順位の低い要素セレクタになリます。
そのため、ブログ記事ページのデザインを適用したくないページがあれば、そこだけを後から別途デザインすることは可能みたいです。  

### Tailwind CSSの@applyディレクティブ
とても便利だなぁと思ったのが、Tailwind CSSの@applyディレクティブです。  
本来生でCSSを書こうと思ったら、```<h1><h2>```タグだけでもこのくらいの量になるようですが、Tailwind CSSの@applyディレクティブを使ったクラスで書くとシンプルになります。

```js
h1 {
  font-size: 1.875rem; /* これは text-3xl に相当 */
  font-weight: bold; /* font-bold */
  color: #1f2937; /* text-gray-800 */
  margin-top: 1rem; /* mt-4 */
}

h2 {
  font-size: 1.5rem; /* text-2xl */
  font-weight: 600; /* font-semibold */
  color: #4b5563; /* text-gray-700 */
  border-left-width: 4px; /* border-l-4 */
  border-left-color: #4b5563; /* border-gray-700 */
  padding-left: 0.5rem; /* pl-2 */
  margin-top: 1rem; /* mt-4 */
  margin-bottom: 0.5rem; /* mb-2 */
}
/* @applyディレクティブで必要な記載↓ */
h1 {
  @apply text-3xl font-bold text-gray-800 mt-4;
}

h2 {
  @apply text-2xl font-semibold text-gray-700 border-l-4 border-gray-700 pl-2 mt-4 mb-2;
}
```
## 記念写真パシャリ
勉強目的で一番最初にこんなサイトが作れればいいなぁと考えていたサイトは完成しました。  
やっているうちにどんどんやりたいことが増えてきていて、やればやるほど完成が遠のいていきますが、一旦満足です。  
![ビフォーアフター](/images/sozai3.png)

## 今後について
やりたいことをまとめておきます。  
(1)プログラミングの勉強  
--過去勉強した時は、さっぱりわかりませんでしたが、今なら少し理解できるかもしれないと思っています。

(2)キュレーションサイトのような機能を追加  
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
Tailwind CSSの@applyディレクティブ

## 参考
Chat-GPT