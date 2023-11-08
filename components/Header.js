import Image from 'next/image';
import Link from 'next/link';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';

export default function Header() {
  const name = '凡人サラリーマンの副業検証';

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <Image
          priority
          src="/images/背景透過Logo.png"
          height={50}
          width={150}
          alt="Site Logo"
        />
      </div>
      <div className={styles.menuContainer}>
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">これから</Link>
      </div>
    </div>
  );
}
