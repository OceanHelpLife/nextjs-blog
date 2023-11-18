import Date from '../../components/date';
import Image from 'next/image';
import Head from 'next/head';
import Layout from '../../components/layout';
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
        <h1>{postData.title}</h1>
        <div>
          <Date dateString={postData.date} />
        </div>
          <Image
            src={postData.thumbnail}
            width={1200}
            height={400} 
            alt={`Thumbnail for ${postData.title}`}
            className="w-full h-auto object-cover object-center rounded-lg"
            sizes='100vw'
            style={{
              width: '100%',
              height: 'auto'
            }}    
          />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

