export interface BlogContentSection {
    type: 'paragraph' | 'heading' | 'image' | 'quote' | 'list' | 'code';
    content: string;
    items?: string[];
    imageCaption?: string;
    language?: string;
}

export interface Blog {
    _id: string;
    title: string;
    description: string;
    content: string;
    image: string;
    author: string;
    category: 'frontend' | 'backend' | 'fullstack' | 'webdesign' | 'mobile' | 'devops' | 'cybersecurity' | 'testing';
    readTime: string;
    badge?: 'new' | 'trending' | 'popular' | 'featured' | 'recommended' | 'advanced' | 'beginner' | 'exclusive' | 'updated' | 'limited';
    slug: string;
    tags: string[];
    isPublished: boolean;
    seo: {
        metaTitle: string;
        metaDescription: string;
        keywords: string[];
    };
    createdAt: string;
    updatedAt: string;
}