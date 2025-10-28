export interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  category: string;
  readTime: string;
  badge?: string;
  featured?: boolean;
  createdAt?: any
  blog?: any
  slug?:string
}

export interface NewsCardProps {
  news: NewsItem;
  onReadMore?: (newsId: string) => void;
}
