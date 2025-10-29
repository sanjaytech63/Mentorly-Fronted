export interface ResourceCategory {
    title: string;
    icon: string;
    description: string;
    items: string[];
    color: string;
}

export interface FeaturedResource {
    title: string;
    description: string;
    icon: string;
    category: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
}
