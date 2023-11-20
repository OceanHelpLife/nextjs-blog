import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import getSortedReferencesData from '../lib/references'; 

export async function getStaticProps() {
    const allReferencesData = await getSortedReferencesData(); 
    return {
      props: {
        allReferencesData,
      },
    };
  }
export default function Reference({ allReferencesData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="text-gray-600 body-font">
        <h1 className="text-3xl font-bold text-center mb-6">
            Reference
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
                    <p className="text-gray-500">{description}</p>
                    <span className="text-sm text-gray-600">カテゴリー：{category}</span> 
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}
