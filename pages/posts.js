import Link from 'next/link';
import Image from 'next/image';
import Date from '../components/date';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Blog({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      
      {/* <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1>Blog</h1>
          <div className="">
            <div className="">
              <ul>
                {allPostsData.map(({ id, date, title, thumbnail }) => (
                  <li key={id}>
                    <Link href={`/posts/${id}`}>
                    <Image
                          src={thumbnail}
                          width={1200}
                          height={72} 
                          alt={`Thumbnail for ${title}`}
                          // sizes='100vw'
                          style={{
                            width: '100%',
                            height: 'auto'
                          }}    
                        />     
                        <h3>{title}</h3>
                    </Link>
                    <br />
                    <small>
                      <Date dateString={date} />
                    </small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section> */}
        <section className="text-gray-600 body-font">
        <h1 className="text-3xl font-bold text-center mb-6">
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
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <Link href="/posts" className='block border gray-300'>more(Blog一覧を表示)</Link>
        </div>
      </section>
    </Layout>
  );
}