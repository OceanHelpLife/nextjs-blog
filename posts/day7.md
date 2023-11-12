---
title: 'サムネイル表示について【Day7】【備忘録⑥】'
date: '2023-11-08'
thumbnail: '/images/サムネ1.jpg'
---

# サムネイルを表示させる手順について
まずは、何をするべきかを整理します。
- 仕組みの理解とファイルの確認
- Frontmatterにサムネイルパスの追加

# 仕組みの理解とファイルの確認
ブログ投稿がどのように行われているのかを復習しておきます。
今回は『next.js-blog』というプロジェクト名を付けています。  
nextjs-blog/posts/sample1・・・.mdという形でブログ記事を作成しています。  

nextjs-blog/lib/posts.jsファイルには、上記のマークダウンファイルからデータを取得して、処理をする関数群が定義されています。 
今回は 
↓これはnext.jsのチュートリアル時から変更を一切加えていません。
ざっくりと、  
getSortedPostsData 関数は、マークダウンファイルの一覧を取得し、それらを日付でソートしてリストとして返します。  
getAllPostIds 関数は、各投稿のID（ファイル名から.mdを取り除いたもの）を取得して、動的ルーティングに必要なパラメータのリストを生成します。
getPostData 関数は、特定のIDに基づいて個々のマークダウンファイルを読み込み、gray-matterを使用してFrontmatterを解析し、remarkを使用してマークダウンをHTMLに変換します。

## nextjs-blog/lib/posts.js
```js
import { remark } from 'remark';
import html from 'remark-html';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
  }
  
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

nextjs-blog/pages/posts/[id].jsファイルでは、上記の getPostData 関数を使用して取得したデータをもとに、HTMLページをレンダリングします。  
(個々のブログ投稿ページのテンプレートを作っています。)

## nextjs-blog/pages/posts/[id].js
```js
import Date from '../../components/date';
import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
      props: {
        postData,
      },
    };
  }

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
```

## 整理したもののまとめ
ざっくりまとめると、マークダウンファイルに記載した内容を、nextjs-blog/lib/posts.jsファイルに記載のgetPostData()で持ってきて、nextjs-blog/pages/posts/[id].jsファイルに記載しているPost()で、各投稿ページに反映させています。  
長くなってしまいましたが、仕組みの理解とファイルの確認は以上となります。

# Post()の変更
各投稿ページにサムネイルを反映させるために、Post()を変更します。  
といっても1文を追記するだけです。  
日付のすぐ下くらいにサムネイルを表示させたいので、
```js
<div className={utilStyles.lightText}>
    <Date dateString={postData.date} />
</div>
<img src={postData.thumbnail} alt={`Thumbnail for ${postData.title}`} />　←★今回追記するもの
```

最後にFrontmatterにサムネイルのパスを追加します。

# Frontmatterにサムネイルパスの追加
これは、超簡単です。
Frontmatterという用語は聞き慣れないですが、文書のタイトル、日付、著者などの情報を定義するものです。  
下記の通り1つThumbnailと追記して、表示させたい画像のパスを追加すればOKです。

```
---
title: "ブログポストのタイトル"
date: "2023-11-08"
thumbnail: '/images/サムネイル.jpg'←★今回追加するもの
---
```

# 表示の確認
表示の確認をしてみると、しっかりサムネイルが表示されています。  
![サムネイル反映](/images/サムネイル表示成功.png)

# 今後について
昨日、やりたいと思ってメモをしていた内容で、一番上に記載した、投稿記事にサムネイルをつける。というものは達成しました。
続いて、一旦デザインは置いといて、トップ画面にサムネを反映させるようにしていきたいと思います。
- 投稿記事にサムネイルをつける。←達成。
- BlogやHOMEのトップ画面に、サムネイル+タイトル（記事リンクを埋め込む）を表示させる。
- CSSについて、現在、/styles/Home.module.cssと/components/layout.module.cssの二つに跨っている。この理由を理解する。

# メモ
next.jsのチュートリアル時にはあまり理解できていなかったが、改めてカスタマイズしながらだと理解が深まってきた。

# 参考文献
特になし。