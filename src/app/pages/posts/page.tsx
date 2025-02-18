import { getBlogPosts } from '@/lib/mdx';
import Link from 'next/link';

export default async function BlogListPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      {posts.map((post) => (
        <div key={post.slug}>
          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
}
