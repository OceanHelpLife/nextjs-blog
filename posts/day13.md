---
title: 'デザイン洗練-Tailwind'
date: '2023-11-14'
thumbnail: '/images/サムネ13.png'
---

## はじめに
今週いっぱいでサイト全体の見た目を整えていきたいと思います。
まずは現在のサイトデザインの記念写真パシャリ。  
![開始時点でのサイトデザイン](/images/サイトトップ1114.png)  

## 目次

## 手順
1. サイト全体のイメージカラーやテーマを選定
2. tailwindを導入
3. 調整

まずは全体観を決めて、その後細かいところをやっていきます。  
【30代で副業に奮闘する貧乏人が海に沈んでいく夕日を眺めている画像】を作ってとCanvaのAIに依頼したところ、  
すごい気に入る画像を生成してくれました。  

##　1.サイト全体のテーマやイメージカラーを選定
色々なデザインのサイトを見ましたが、結局センスですね・・・  
あと使用する写真や画像（要はコンテンツ）ですね・・・  
センスが磨かれていないうちは、CanvaのAIにお願いすることにしました。

### TOP画像の作成
プロンプト  
海辺で夕日を眺める30代の貧乏人のイメージ画像を作って。
![トップ画](/images/トップ画.png)

### サイトのカラーパレット作成
統一感を持たせるために、カラーパレットを先に作っておきます。  
だいぶTOP画像が気に入ったので、トップ画像と統一感が出るようなカラーパレットを作成します。
といっても、Canvaに作成してもらうだけですが・・・  
![カラーパレット](/images/カラーパレット.png)

## Tailwindを導入
CSSについてちゃんと学んだことない人でも、簡単に利用できるCSSフレームワークとして、Tailwindが人気あるようです。  
また、next.jsで新規プロジェクトを作ると、Tailwindを利用する？と質問が最初からあるので、信頼できます。  
(私はよくわからなかったので、ノーにしてしまいましたが・・・)  
導入手順としては、下記の通りです。
1. Tailwind CSSのインストール: プロジェクトのディレクトリで、npmまたはyarnを使用してTailwind CSSをインストールします。
2. 設定ファイルの作成: Tailwindの設定ファイル（tailwind.config.js・postcss.config.js）をプロジェクトのルートに作成します。
3. CSSファイルへのインポート: 既存のCSSファイル、または新しいCSSファイルにTailwindのディレクティブ（@tailwind base; @tailwind components; @tailwind utilities;）を追加します。

### 1.Tailwindインストール
```js
npm install tailwindcss
```

### 2.Tailwind設定ファイルの作成
```js
npx tailwindcss init
```
```js
tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
```js
postcss.config.js
module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };
```

### 3.CSSファイルへのインポート
```js
global.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 調整(1)
全くTailwindcssが効かない・・・  
『Tailwindcss 効かない』で検索すると結構同じような症状が出ている人が多いようです。

解消方法を検索しながら効かせるように色々と試行錯誤が必要となりました。
結果的にTailwindcssが効くようになりました。

1. VScodeの拡張機能インストール
2. プロジェクトのリセット

### VScodeの拡張機能インストール
「Unknown at rule @tailwind」という表示がVScodeの【問題】という箇所に表示されていたので、これが原因かと思い、
「Tailwind CSS IntelliSense」と「PostCSS Language Support」の二つの拡張機能をインストールしました。  
ただし、VScode上の問題は解消されましたが、依然としてTailwindcssは効いていません・・・

### プロジェクトのリセット
色々調べたりしているうちに、プロジェクト自体をリセットするのが手っ取り早いという記事を見つけました。

#### node_modulesフォルダの削除
```js
Terminal
rm -rf node_modules
```
#### package-lock.jsonを削除
```js
Terminal
rm package-lock.json
```
#### 依存関係を再インストール
```js
Terminal
npm install
```

3時間くらい時間はかかってしまいましたが、無事にTailwindcssが効きました。

## 今後について
HOME画面のデザインを設定しながら、Tailwindについて学んでいきます。  
シンプルでいいのでそれっぽいWebが作れればと考えています。

## メモ
今まで、CSSファイルが複数にまたがっていたので、なんとなくやりずらさを感じていました。
そこで、global.css以外は全削除するとこにしました。
統一感を持たせるためにも、まずはTailwindを活用することにします。

## 参考
[Tailwind CSSを導入したいけどスタイルが反映されない？Unknown at rule @tailwind エラーを解消する3つの方法](https://mimihokuro.com/unknown-at-rule-tailwind/)  
