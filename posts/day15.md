---
title: 'Tailwindテンプレートについて(ブログ記事ページについて)'
date: '2023-11-16'
thumbnail: '/images/サムネ15.png'
---

## はじめに
[Day14-Tailwindテンプレートについて(TOPページ)](/posts/day14)でTailwindのテンプレートを利用して、トップページのレイアウトを作ることができたので、続いて、ブログ記事ページのレイアウトを固めていきます。
昨日同様、一旦、/pages/study2.jsという空のページを作成し、https://www.oceanhelplife.com/study2でアクセスできるようにしておきます。
```js
study2.js
export default function Study() {
  return <div>

  </div>;
}
```

## 目次

## Tailwindのデザインテンプレートについて
昨日同様、無料で利用できるサイトから良い感じのテンプレートを探します。

- [Tailblocks](https://tailblocks.cc/)  
- [Wickedblocks](https://wickedblocks.dev/)  
- [Flowrift](https://flowrift.com/)

ブログ記事ページのテンプレートを探していると、[Flowrift](https://flowrift.com/)に載っているテンプレートが良い感じでしたので、このサイトを活用させてもらいます。

### [Flowrift](https://flowrift.com/)でブログ記事ページを作成
下記のように一番外枠に<div>タグをつけて、その中にテンプレートのコピペを行います。
```js
study.js
export default function Study2() {
  return <div>

  </div>;
}
```

無事にうまく表示されました。  
![study2-トップページ](/images/study2.png)

## 今後について
次は、実際の画面にクラス名を当てていきたいと思います。  

## メモ
前回は、class→className(JSX)にしないとエラーとなってしまっていたが、今回はなぜかテンプレートのコピペそのままでなんのエラーもなく表示された。  
よくわからない・・・

## 参考
[Reactで使用するJSXの基本をわかりやすく解説](https://kinsta.com/jp/knowledgebase/what-is-jsx/)  
- [Tailblocks](https://tailblocks.cc/)  
- [Wickedblocks](https://wickedblocks.dev/)  
- [Flowrift](https://flowrift.com/)
