export interface PostMatter {
    title: string
    date: string
    description: string
    tags: string[]
  }
  
  export interface Post extends PostMatter {
    url: string;
    slug: string;
    categoryPath: string;
    content: string;
  }