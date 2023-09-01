export interface User {
  name: string;
  password: string;
  email: string;
  role: "author" | "commentator";
}

export interface Post {
  userName: string;
  title: string;
  post: string;
}
export interface Comment {
  userName: string;
  postId: string;
  comment: string;
}
