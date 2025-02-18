import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  author: string
}

const blogPostsDirectory = path.join(process.cwd(), 'src/app/pages/posts/markdown')

export async function getBlogPosts(): Promise<BlogPost[]> {
  const fileNames = fs.readdirSync(blogPostsDirectory)
  
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(blogPostsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      
      const { data } = matter(fileContents)
      
      const { slug, ...rest } = data as BlogPost;
      return {
        slug: fileName.replace(/\.mdx$/, ''),
        ...rest
      }
    })
  )

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getBlogPost(slug: string) {
  const fullPath = path.join(blogPostsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  const { frontmatter, content } = await compileMDX({
    source: fileContents,
    options: { 
      parseFrontmatter: true 
    }
  })

  return {
    slug,
    ...frontmatter,
    content
  }
}