export interface Comment {
    id: number;
    movieEpisodeId: string;
    body: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
}