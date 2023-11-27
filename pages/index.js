import Link from 'next/link';
import Image from 'next/image'
import Date from '../components/date';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import getSortedReferencesData from '../lib/references';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData().slice(0, 6);
  const allReferencesData = await getSortedReferencesData().slice(0,6)

  return {
    props: {
      allPostsData,
      allReferencesData
    },
  };
}

export default function Home({ allPostsData, allReferencesData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Image 
        src={"/images/副業検証Journey.png"}
        width={1000}
        height={400} 
        alt="副業検証Journey"
      />
      <section className="text-gray-600 body-font">
        <h1 className="text-3xl font-bold text-center mt-12 mb-6">
          <Link href="/posts">
            Blog
          </Link>
        </h1>
        <div className="container mx-auto">
          <ul className="flex flex-wrap -m-4 justify-center">
            {allPostsData.map(({ id, date, title, thumbnail }) => (
              <li key={id} className="lg:w-1/3 md:w-1/2 p-4">
                <Link href={`/posts/${id}`}>
                    <small className="text-gray-500">
                      <Date dateString={date} />
                    </small>
                    <Image
                      src={thumbnail}
                      width={1000}
                      height={400} 
                      alt={`Thumbnail for ${title}`}
                      className="w-full h-auto object-cover object-center rounded-lg"
                    />                 
                    <h3 className="text-lg font-medium text-gray-900 mt-2">{title}</h3>
                </Link>
              </li>
            ))}
            <Link href="/posts" className='block border gray-300 mb-2 mt-6'>___more(Blog一覧を表示)___</Link>
          </ul>
        </div>
      </section>
      <section className="text-gray-600 body-font">
        <h1 className="text-3xl font-bold text-center mt-12 mb-6">
          <Link href="/references">
            Reference
          </Link>
        </h1>
        <div className="container mx-auto">
          <ul className="flex flex-wrap -m-4 justify-center">
            {allReferencesData.map(({ id, title, thumbnail, url, description, category }) => (
              <li key={id} className="lg:w-1/3 md:w-1/2 p-4">
                <Link href={url}>
                  <div>
                    <Image
                      src={thumbnail}
                      width={1000}
                      height={400}
                      alt={`Thumbnail for ${title}`}
                      className="w-full h-auto object-cover object-center rounded-lg"
                    />
                    <h3 className="text-lg font-medium text-gray-900 mt-2">{title}</h3>
                    <p className="text-gray-500">一言メモ：{description}</p>
                    <span className="text-sm text-gray-600">カテゴリー{category}</span> 
                  </div>
                </Link>
              </li>
            ))}
           <Link href="/references" className='block border gray-300 mb-2 mt-6'>___more(Reference一覧を表示)___</Link>
          </ul>
        </div>
      </section>
    </Layout>
  );
}