export interface CreateCommentInput {
    movieEpisodeId: string;
    body: string;
    author: string;
}

export interface CommentFilterInput {
    movieEpisodeId?: string;
}
