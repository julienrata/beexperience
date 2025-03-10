import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

// Define interfaces locally instead of importing from models package for simplicity
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

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl: string = '';

  constructor(
    private http: HttpClient,
  ) { }
  
  // This needs to be called to set the correct API URL based on environment
  setApiUrl(baseUrl: string): void {
    this.apiUrl = `${baseUrl}/blog`;
  }

  // Blog API methods
  getBlogs(query?: BlogQuery): Observable<PaginatedBlogs> {
    if (!this.apiUrl) {
      throw new Error('API URL not set. Call setApiUrl first.');
    }
    
    let params = new HttpParams();
    
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      });
    }
    
    return this.http.get<{ success: boolean, data: Blog[], pagination: any }>(`${this.apiUrl}/blogs`, { params })
      .pipe(
        catchError(error => throwError(() => error)),
        map(data => ({
          blogs: data.data,
          pagination: data.pagination
        }))
      );
  }

  getBlogById(id: string): Observable<Blog> {
    if (!this.apiUrl) {
      throw new Error('API URL not set. Call setApiUrl first.');
    }
    
    return this.http.get<{ success: boolean, data: Blog }>(`${this.apiUrl}/blogs/${id}`)
      .pipe(
        catchError(error => throwError(() => error)),
        map(data => data.data)
      );
  }

  getBlogBySlug(slug: string): Observable<Blog> {
    if (!this.apiUrl) {
      throw new Error('API URL not set. Call setApiUrl first.');
    }
    
    return this.http.get<{ success: boolean, data: Blog }>(`${this.apiUrl}/blogs/slug/${slug}`)
      .pipe(
        catchError(error => throwError(() => error)),
        map(data => data.data)
      );
  }

  getBlogsByTag(tagSlug: string, query?: BlogQuery): Observable<PaginatedBlogs> {
    if (!this.apiUrl) {
      throw new Error('API URL not set. Call setApiUrl first.');
    }
    
    let params = new HttpParams();
    
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      });
    }
    
    return this.http.get<{ success: boolean, data: Blog[], pagination: any }>(`${this.apiUrl}/blogs/tag/${tagSlug}`, { params })
      .pipe(
        catchError(error => throwError(() => error)),
        map(data => ({
          blogs: data.data,
          pagination: data.pagination
        }))
      );
  }

  createBlog(blogData: BlogFormData): Observable<Blog> {
    if (!this.apiUrl) {
      throw new Error('API URL not set. Call setApiUrl first.');
    }
    
    return this.http.post<{ success: boolean, data: Blog }>(`${this.apiUrl}/blogs`, blogData)
      .pipe(
        catchError(error => throwError(() => error)),
        map(data => data.data)
      );
  }

  updateBlog(id: string, blogData: BlogUpdateFormData): Observable<Blog> {
    if (!this.apiUrl) {
      throw new Error('API URL not set. Call setApiUrl first.');
    }
    
    return this.http.put<{ success: boolean, data: Blog }>(`${this.apiUrl}/blogs/${id}`, blogData)
      .pipe(
        catchError(error => throwError(() => error)),
        map(data => data.data)
      );
  }

  deleteBlog(id: string): Observable<null> {
    if (!this.apiUrl) {
      throw new Error('API URL not set. Call setApiUrl first.');
    }
    
    return this.http.delete<{ success: boolean, data: null }>(`${this.apiUrl}/blogs/${id}`)
      .pipe(
        catchError(error => throwError(() => error)),
        map(data => data.data)
      );
  }

  // Tag API methods
  getTags(): Observable<Tag[]> {
    if (!this.apiUrl) {
      throw new Error('API URL not set. Call setApiUrl first.');
    }
    
    return this.http.get<{ success: boolean, data: Tag[] }>(`${this.apiUrl}/tags`)
      .pipe(
        catchError(error => throwError(() => error)),
        map(data => data.data)
      );
  }

  getTagById(id: string): Observable<Tag> {
    if (!this.apiUrl) {
      throw new Error('API URL not set. Call setApiUrl first.');
    }
    
    return this.http.get<{ success: boolean, data: Tag }>(`${this.apiUrl}/tags/${id}`)
      .pipe(
        catchError(error => throwError(() => error)),
        map(data => data.data)
      );
  }

  getTagBySlug(slug: string): Observable<Tag> {
    if (!this.apiUrl) {
      throw new Error('API URL not set. Call setApiUrl first.');
    }
    
    return this.http.get<{ success: boolean, data: Tag }>(`${this.apiUrl}/tags/slug/${slug}`)
      .pipe(
        catchError(error => throwError(() => error)),
        map(data => data.data)
      );
  }

  createTag(tagData: TagFormData): Observable<Tag> {
    if (!this.apiUrl) {
      throw new Error('API URL not set. Call setApiUrl first.');
    }
    
    return this.http.post<{ success: boolean, data: Tag }>(`${this.apiUrl}/tags`, tagData)
      .pipe(
        catchError(error => throwError(() => error)),
        map(data => data.data)
      );
  }

  updateTag(id: string, tagData: TagFormData): Observable<Tag> {
    if (!this.apiUrl) {
      throw new Error('API URL not set. Call setApiUrl first.');
    }
    
    return this.http.put<{ success: boolean, data: Tag }>(`${this.apiUrl}/tags/${id}`, tagData)
      .pipe(
        catchError(error => throwError(() => error)),
        map(data => data.data)
      );
  }

  deleteTag(id: string): Observable<null> {
    if (!this.apiUrl) {
      throw new Error('API URL not set. Call setApiUrl first.');
    }
    
    return this.http.delete<{ success: boolean, data: null }>(`${this.apiUrl}/tags/${id}`)
      .pipe(
        catchError(error => throwError(() => error)),
        map(data => data.data)
      );
  }

  // Blog-Tag relation API methods
  addTagToBlog(blogId: string, tagId: string): Observable<Blog> {
    if (!this.apiUrl) {
      throw new Error('API URL not set. Call setApiUrl first.');
    }
    
    return this.http.post<{ success: boolean, data: Blog }>(`${this.apiUrl}/blogs/${blogId}/tags/${tagId}`, {})
      .pipe(
        catchError(error => throwError(() => error)),
        map(data => data.data)
      );
  }

  removeTagFromBlog(blogId: string, tagId: string): Observable<Blog> {
    if (!this.apiUrl) {
      throw new Error('API URL not set. Call setApiUrl first.');
    }
    
    return this.http.delete<{ success: boolean, data: Blog }>(`${this.apiUrl}/blogs/${blogId}/tags/${tagId}`)
      .pipe(
        catchError(error => throwError(() => error)),
        map(data => data.data)
      );
  }
}