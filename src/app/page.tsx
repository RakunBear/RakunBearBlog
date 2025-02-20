import { redirect } from 'next/navigation';
import { getPostPaths } from '@/lib/mdx';

export default function Home() {
  const path = getPostPaths();
  console.log(path);
  return (
      // redirect('/pages')
      <h1>ssfs</h1>
  );
}
