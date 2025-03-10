export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string | BlogAuthor;
  tags: Tag[];
  featuredImage?: string;
  status: 'draft' | 'published';
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  featuredImage?: string;
  status: 'draft' | 'published';
}

export interface BlogUpdateFormData {
  title?: string;
  content?: string;
  excerpt?: string;
  tags?: string[];
  featuredImage?: string;
  status?: 'draft' | 'published';
}

export interface PaginatedBlogs {
  blogs: Blog[];
  pagination: {
    total: number;
    pages: number;
    page: number;
    limit: number;
  };
}

export interface BlogQuery {
  status?: 'draft' | 'published';
  tag?: string;
  author?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface TagFormData {
  name: string;
  description?: string;
}