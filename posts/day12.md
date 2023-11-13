---
title: 'next.js13のimageコンポーネントについて'
date: '2023-11-12'
thumbnail: '/images/サムネ11.png'
---
## はじめに
ずっと気になっていることがありました。
next.jsのチュートリアルの通りにImageコンポーネントを使用しているつもりでしたが、カスタマイズする際に参考にしていたものが、古かったようで、どうやらnext.js13にアップデートされた際、Imageコンポーネントの利用方法に変更があったようです。サイト上では従来のImageコンポーネントの使い方でも私の場合は特に問題なく表示されていましたが、ローカル開発環境で確認する度にターミナルに下記のように表示されていました。
```js
Image with src "/images/サムネ10.png" has legacy prop "layout". Did you forget to run the codemod?
Read more: https://nextjs.org/docs/messages/next-image-upgrade-to-13
```
なんとなく嫌なので、正しいImageコンポーネントの使い方に今のうちに直しておきます。  

## next.jsのイメージコンポーネントについて
私のサイトにとって一番大きな変更はLayout属性が使えなくなったことです。  
(その他にも色々と変更点はありますが、現時点で関係するのはここだけでした。)

今までレスポンスデザイン（スマホで見る時とPCで見る時でデザインを変える）について勉強したことは全くありませんでしたが、レスポンスデザインが色々な観点から推奨されています。  
ということで、浅い理解でレスポンスデザインを引き継ぐ形での変更を実施しました。

### next.js1２以前
```js
<Image
    src={postData.thumbnail}
    width={1280}
    height={720} 
    alt={`Thumbnail for ${postData.title}`}
    layout='responsive'//layout属性で'responsive'を設定
    className={utilStyles.thumbnailImage}
/>
```

### next.js13以降
```js
<Image
    src={postData.thumbnail}
    width={1280}
    height={720} 
    alt={`Thumbnail for ${postData.title}`}
    className={utilStyles.thumbnailImage}
    sizes='100vw'
    style={{
        width: '100%',
        height: 'auto'
    }}
/>
//layoutを削除し、styleを追加
//↑ここでlayout='responsive'と見え方が同じになります。
```
無事に画像が表示され、ターミナルから注意文が消えました。

## 今後について
今週はなんとしてもcssでサイトの見た目を整える！

## メモ
平日は時間を確保するのが厳しい・・・

## 参考
[Next.js 13のnext/image（next/future/image）へ移行する](https://ebisu.com/note/next-image-migration/)
