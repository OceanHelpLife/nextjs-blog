---
title: '目次を作る'
date: '2023-11-11'
thumbnail: '/images/サムネ10.png'
---
## 目次

## 目次を作るための手順
目次を作るための手順
色々なやり方はあると思いますが、自分でも出来そうだなと思うやり方を見つけましたので、そのやり方で実行します。

### 必要なパッケージのインストール
まずは目次を作るための2つのプラグインをインストールします。
- rehype-slug：　HTML見出し要素に自動的にIDを追加
- remark-toc：　Markdownコンテンツから目次を生成

```js
ターミナル
% npm install rehype-slug remark-toc
```

### getPostData()を更新

```js
変更前
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

```js
変更後
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

### MarkDownファイルに【目次】という見出しを追加
getPostData()更新後に、実際のMarkdownファイルで、目次を追加したい箇所に下記のように見出しで、目次を追加します。
```js
## 目次
↓
ーーー
ここからは普段通りの投稿記事内容
```

これで、このブログの冒頭のように目次が表示されるようになります。

## 今後について
現時点で欲しい機能は最低限揃えることができため、今まで行なったことを復習して、自分なりにまとめておく。  
明日は日曜日なので、時間的に余裕があれば、そろそろデザインについても考えてみる。

## メモ
昨日の[コードブロック](/posts/day9)で行なったことがそのまま活かせた。  
GitHubのドキュメントを読むことの大切さがようやくわかってきた。

## 参考文献
[Next.jsを利用した初めての本格的Markdownブログサイトの構築](https://reffect.co.jp/react/nextjs-markdown-blog/#remark-rehype%E3%81%AE%E5%88%A9%E7%94%A8)
[rehype-slug](https://github.com/rehypejs/rehype-slug)
[remark-toc](https://github.com/remarkjs/remark-toc)