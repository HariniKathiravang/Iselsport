import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!process.env.SANITY_REVALIDATE_TOKEN || token !== process.env.SANITY_REVALIDATE_TOKEN) {
    return NextResponse.json({ revalidated: false, message: "Invalid token" }, { status: 401 });
  }

  revalidateTag("portfolio");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
