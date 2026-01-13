export interface Brand {
    name: string;
    description: string;
    url: string;
    image: string;
}

export interface VerticalShowcase {
    id: string;
    title: string;
    description: string;
    brands: Brand[];
}
