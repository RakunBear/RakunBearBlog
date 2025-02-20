import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sync } from 'glob'
import { Post, PostMatter } from '@/config/types'

const BASE_PATH = 'src/posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);
const POSTS_BASE_URL = '/pages/posts';

export const getPostPaths = (category?: string) => {
  const folder = category || '**';
  const postPaths: string[] = sync(`${POSTS_PATH}/${folder}/**/*.mdx`);
  return postPaths;
};

const parsePost = async (postPath: string): Promise<Post> => {
  const postAbstract = parsePostAbstract(postPath);
  const postDetail = await parsePostDetail(postPath);
  return {
    ...postAbstract,
    ...postDetail,
  };
};

export const parsePostAbstract = (postPath: string) => {
  const normalizedPath = postPath.replace(/\\/g, '/');
  const basePathIndex = normalizedPath.indexOf(BASE_PATH);
  const filePath = normalizedPath.slice(basePathIndex + BASE_PATH.length + 1).replace(/\.mdx$/, '');

  const [categoryPath, slug] = filePath.split('/');
  console.log(slug);
  const url = `${POSTS_BASE_URL}/${categoryPath}/${slug}`;
  return { url, categoryPath, slug };
};

// MDX detail
const parsePostDetail = async (postPath: string) => {
  const file = fs.readFileSync(postPath, 'utf8');
  const { data, content } = matter(file);
  const grayMatter = data as PostMatter;
  return { ...grayMatter, content };
};


export const getSortedPostList = async (category?: string): Promise<Post[]> => {
  const postPaths = getPostPaths(category);
  const postList = await Promise.all(postPaths.map((postPath) => parsePost(postPath)));
  return postList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const getPostDetail = async (category: string, slug: string) => {
    const postPaths = sync(`${POSTS_PATH}/${category}/**/*.mdx`);
    const postPath = postPaths.length > 0 ? postPaths[0] : '';
    const detail = await parsePost(postPath);
    return detail;
};