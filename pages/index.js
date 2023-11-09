import Link from 'next/link';
import Image from 'next/image'
import Date from '../components/date';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';


export async function getStaticProps() {
  const allPostsData = getSortedPostsData().slice(0, 4);
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
      <section className={utilStyles.headingMd}>
        <p>10年頑張っても目立った出世も出来ず、給料も上がらず・・・サラリーマン人生に諦めが出てきた今日この頃。<br></br>一生懸命会社に尽くすことはもう無理・・・</p>
        <p>もう若くないので『起業』や『転職』は怖い。一回副業にチャレンジ中。</p>
        <p>少しでも今の生活を良くしたい！</p>       

      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>
          <Link href="/blog">
            Blog
          </Link>
        </h2>
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
        <Link href="/blog">more(Blog一覧を表示)</Link>
      </section>
    </Layout>
  );
}