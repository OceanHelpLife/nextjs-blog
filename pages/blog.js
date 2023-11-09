import Link from 'next/link';
import Image from 'next/image';
import Date from '../components/date';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}


export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h1 className={utilStyles.headingLg}>Blog</h1>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, thumbnail }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                 <Image
                    src={thumbnail}
                    width={1280}
                    height={720} 
                    alt={`Thumbnail for ${title}`}
                    layout='responsive'
                    className={utilStyles.thumbnailImage}
                  />
                  <h3 className={utilStyles.headingLg}>{title}</h3>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>

      </section>
    </Layout>
  );
}