import Date from '../../components/date';
import Image from 'next/image';
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
        {/* <Image
          src={postData.thumbnail}
          width={1280}
          height={720} 
          alt={`Thumbnail for ${postData.title}`}
          layout='responsive'
          className={utilStyles.thumbnailImage}
        />         */}
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
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

