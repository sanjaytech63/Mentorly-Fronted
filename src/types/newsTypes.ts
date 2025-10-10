export interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  badge?: string;
  featured?: boolean;
}

export interface NewsCardProps {
  news: NewsItem;
  onReadMore?: (newsId: string) => void;
}
