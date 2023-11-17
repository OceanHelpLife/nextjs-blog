import Link from 'next/link';
import Image from 'next/image'
import Date from '../components/date';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
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
      <section className="">
        <p>10年頑張っても目立った出世も出来ず、給料も上がらず・・・サラリーマン人生に諦めが出てきた今日この頃。<br></br>一生懸命会社に尽くすことはもう無理・・・</p>
        <p>もう若くないので『起業』や『転職』は怖い。一回副業にチャレンジ中。</p>
        <p>少しでも今の生活を良くしたい！</p>       
      </section>
      <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          <Link href="/posts">
            Blog
          </Link>
        </h1>
        <ul className='lg:w-1/3 sm:w-1/2 p-4'>
          {allPostsData.map(({ id, date, title, thumbnail }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                  <small className="text-gray-500">
                    <Date dateString={date} />
                  </small>
                  <Image
                    src={thumbnail}
                    width={1000}
                    height={50} 
                    alt={`Thumbnail for ${title}`}
                    className="w-full h-auto object-cover object-center rounded-lg"
                    // sizes='100vw'
                    // style={{
                    //   width: '100%',
                    //   height: 'auto'
                    // }}    
                  />                 
                  <h3 className="text-lg font-medium text-gray-900 mt-2">{title}</h3>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/posts">more(Blog一覧を表示)</Link>
        </div>
      </section>
    </Layout>
  );
}