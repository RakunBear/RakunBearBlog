import { Post } from '@/config/types';
import { getPostDetail } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';

const BlogPost = async ({ params }: { params: Promise<{ category : string, slug : string }> }) => {
  const { category, slug } = await params;
  const post = await getPostDetail(category, slug);
  return (
    <div>
        <MDXRemote source={post.content} />
    </div>
  );
}

export default BlogPost;
