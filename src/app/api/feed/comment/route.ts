import { NextResponse } from "next/server";
import { PostAction } from "@/actions/post";
import { Comment } from "@/types/dto-out";

export async function POST(request: Request) {
  try {
    const body: Comment = await request.json();
    const { comment, userName, postId } = body;
    if (!comment || !postId || !userName) {
      return NextResponse.json("error", {
        status: 400,
        statusText: "Some data is missing",
      });
    }
    const user = await PostAction.createNewComment(body);
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json("error", {
      status: 500,
      statusText: (err as Error).message,
    });
  }
}
