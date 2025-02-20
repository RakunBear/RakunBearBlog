import { getSortedPostList } from "@/lib/mdx";
import Link from "next/link";

export interface PostListProps {
  category?: string;
}

const PostListPage = async ({ category }: PostListProps) => {
  const posts = await getSortedPostList(category);
  return (
    <div>
      {posts.map((post) => (
        <div key={post.slug} className="m-8">
          <Link href={post.url} className="hover:text-primary">
            {post.title}
          </Link>
          <p><span className="font-bold text-red-500">Title</span>{post.title}</p>
          <p><span className="font-bold text-red-500">Date</span>{post.date}</p>
          <p><span className="font-bold text-red-500">Tags</span>{post.tags}</p>
          <p><span className="font-bold text-red-500">Description</span>{post.description}</p>
          <p><span className="font-bold text-red-500">CategoryPath</span>{post.categoryPath}</p>
          <p><span className="font-bold text-red-500">Slug</span>{post.slug}</p>
          <p><span className="font-bold text-red-500">Content</span>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PostListPage;