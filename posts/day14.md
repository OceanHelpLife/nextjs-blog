---
title: 'Tailwindテンプレートについて(TOPページ)'
date: '2023-11-15'
thumbnail: '/images/サムネ14.png'
---

## はじめに
Tailwindを効かすのに四苦八苦しましたが、無事に[Day13-デザイン洗練-Tailwind](/posts/day13)でTailwindを効かせることに成功しましたので、次にサイト全体のレイアウトについて考えていきます。  
ただ、なんか世の中のwebサイトについては、やっぱりプロの仕事だなぁ・・・って感じるようなものが多く、今の私のレベルではかなり時間がかかってしまいそうなので、まずはそれなりの見た目さえ整えられれば良しとします。  
また、すでにコンテンツのあるページで試すのが怖いため、一旦、/pages/study.jsという空のページを作成し、https://www.oceanhelplife.com/studyでアクセスできるようにしておきます。
```js
study.js
export default function Study() {
  return <div>
  
  
  </div>;
}
```

## 目次

## Tailwindのチートシートについて
まずはTailwindの勉強をしてみます。  
大体何かを勉強しようと思った時には、チートシートを探してしまいます。笑  
やっぱりありましたが、初学者にはキツすぎる・・・  
なんとなく意味はわかりますが、そもそもFlexBox＆Gridとか言われても、さっぱりわかりません・・・
[Tailwindのチートシート](https://tailwindcomponents.com/cheatsheet/)
![Tailwindのチートシート](/images/チートシート.png)

## Tailwindのデザインテンプレートについて
チートシートとTailwindの勉強は一旦置いといて、次にテンプレートを探すことにします。  
テンプレートがあれば、ちょっとずつ変更してみたりと実践的な勉強ができると考えました。  
無料で利用できるサイト  
- [Tailblocks](https://tailblocks.cc/)  
- [Wickedblocks](https://wickedblocks.dev/)
- [Flowrift](https://flowrift.com/)

他のサイトもいくつかみてみましたが、違いがあまり分からなかったので、一旦この二つのサイトのテンプレートを使ってみようと思いましたが、Tailblocksを試していると、かなり良かったので、トップページでのメインはTailblocksとします。

### [Tailblocks](https://tailblocks.cc/)でトップページを作成
TailBlocksでヘッダーとコンテンツのテンプレートを試してみます。  
注意点としては、単純なコピペではなく、JSX(JavascriptのコードをHTMLのような記法で書ける)へ変更しなくてはいけないようです。  
コピペでエラーになったのは下記3点でした。
1. 常に1つのルート要素を返す
2. imgタグの終わりに"/"を追加する
3. class　→　classNameに置換する

下記のように一番外枠に<div>タグをつけて、その中にテンプレートのコピペを行います。
```js
study.js
export default function Study() {
  return <div>
  
  
  </div>;
}
```

無事にうまく表示されました。  
![study-トップページ](/images/study1.png)

## 今後について
次にstudy2として、ブログページのデザインを考えていきます。

## メモ
JSXとは？  
ーーHTML、CSS、Javascriptを1つにまとめる方法。

## 参考
[Reactで使用するJSXの基本をわかりやすく解説](https://kinsta.com/jp/knowledgebase/what-is-jsx/)