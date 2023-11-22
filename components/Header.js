import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return <>
  <header className="text-gray-600 body-font bg-orange-100">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <Image 
        src="/images/sozai1.png" 
        width={50}        
        height={50}       
        className="text-white p-2 rounded-full" 
        alt="Logo"
      />
      <span className="ml-3 text-xl">OceanHelpLife</span>
    </Link>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <Link href="/" className="mr-5 hover:text-gray-900">HOME</Link>
      <Link href="/posts" className="mr-5 hover:text-gray-900">Blog</Link>
      <Link href="/references" className="mr-5 hover:text-gray-900">Reference</Link>
      <Link href="/about" className="mr-5 hover:text-gray-900">About</Link>
    </nav>
  </div>
</header>
</>
}