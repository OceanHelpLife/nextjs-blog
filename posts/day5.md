---
title: 'Header,Faviconの作成について【Day5】【備忘録④】'
date: '2023-11-06'
---

# Header(ヘッダー)を作ってみる
[Day4](posts/day4.md)でロゴイメージを作ってみましたので、  
次にそのロゴをサイトのヘッダーに設定してみます。
next.jsのチュートリアルにはヘッダーの付け方は載っていませんでしたが、[Next.jsを利用した初めての本格的Markdownブログサイトの構築](https://reffect.co.jp/react/nextjs-markdown-blog/#%E3%83%AC%E3%82%A4%E3%82%A2%E3%82%A6%E3%83%88%E3%81%AE%E8%A8%AD%E5%AE%9A)というサイトを見つけたので、その内容の通りにヘッダーを作っていきます。
ただ、コードがさっぱり理解できませんので、こういうときは、ChatGPTに聞くのが一番です。  
まずは、ChatGPTが分からない、具体的なこと（関係しそうなファイルのPath等）をとにかく共有して、『ヘッダーをサイトに作りたいんだけれども！』とお願いすると、サクッとこんな感じでコードを出してくれます。  

```
import Image from 'next/image';
import Link from 'next/link';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';

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
        <Link href="/about">これから</Link>
        <Link href="/contact">これから</Link>
      </div>
    </div>
  );
}

```
![元々のヘッダーイメージ画像](/images/サイトロゴ-初期設定.png)

        ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

![現在のヘッダーイメージ画像](/images/変更後ヘッダーイメージ画像.png)

現状、Home画面と、Blogの投稿ページしかないため、メニューバーに意味はありませんが、今後、記載するコンテンツが増える時の参考になればと思い、そのまま残しておきます。

# Faviconを作ってみる
Faviconというもの自体初めて知りましたが、この黒の三角形がFavicon（ファビコン）というみたいです。  

![元々のFavicon](/images/元Favicon.png)

とりあえず、意味があるのかないのかはわかりませんが、サイトのシンボルということで、ロゴマークに変更しました。

![Favicon比較](/images/Favicon比較.png)

# 今後について
記事を増やすとHomeが見にくくなってしまうため、HomeにはBlogの最新６記事くらいを表示させて、『more』ボタンを設置する。  
またmoreボタンのリンク先（Blogトップ画面）を作成する。

1週間に1回くらいのペースで振り返りを行う必要がありそうなため、1回過去の勉強を振り返る時間を作る。

# メモ
仕事しながら勉強するのはとても大変・・・  
副業を成功させている人は体力お化け・・・  
恐ろしいくらい時間があっという間に過ぎる・・・

[GitHub Copilot](https://docs.github.com/copilot)というプログラミング専門のAIサービスがあるとのこと。  
ChatGPTと同じような感じだとは思いますが、こちらも30日間のお試し期間があるので、明日にでも触ってみようと思います。

# 参考文献
[Next.jsを利用した初めての本格的Markdownブログサイトの構築](https://reffect.co.jp/react/nextjs-markdown-blog/#%E3%83%AC%E3%82%A4%E3%82%A2%E3%82%A6%E3%83%88%E3%81%AE%E8%A8%AD%E5%AE%9A)
