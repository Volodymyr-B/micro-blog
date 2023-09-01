export interface Post {
  id: string;
  title: string;
  post: string;
  comments: Comment[];
  userName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  comment: string;
  userName: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
}
