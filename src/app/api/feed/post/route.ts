import { NextResponse } from "next/server";
import { PostAction } from "@/actions/post";
import { Post } from "@/types/dto-out";

export async function POST(request: Request) {
  try {
    const body: Post = await request.json();
    const { post, title, userName } = body;
    if (!post || !title || !userName) {
      return NextResponse.json("error", {
        status: 400,
        statusText: "Some data is missing",
      });
    }
    const user = await PostAction.createNewPost(body);
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json("error", {
      status: 500,
      statusText: (err as Error).message,
    });
  }
}
