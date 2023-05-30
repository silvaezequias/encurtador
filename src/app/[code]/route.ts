import url from "@/models/url";
import { NextRequest, NextResponse } from "next/server";

interface NextContext {
  params: { code: string };
}

export async function GET(request: NextRequest, context: NextContext) {
  const code = context.params.code;
  const urlObject = await url.findOneByShortCode(code);

  if (!urlObject) {
    return NextResponse.json(
      { error: "Code entered does not exist or has expired." },
      { status: 404, statusText: "invalid_code" }
    );
  }

  return NextResponse.redirect(urlObject.longUrl);
}
