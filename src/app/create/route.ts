import { CodeGenerator, host, validateLongUrl } from "@/util/url";
import { NextRequest, NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import url from "@/models/url";

const router = createEdgeRouter<NextRequest, NextContext>();

interface NextContext {
  params: { url: string };
}

async function createUniqueShortCode(): Promise<string> {
  const randomLength = Math.floor(Math.random() * 5 + 5);
  const shortCode = CodeGenerator(randomLength);
  const storedUrl = await url.findOneByShortCode(shortCode);

  if (storedUrl) {
    return await createUniqueShortCode();
  }

  return shortCode;
}

function validationHandler(request: NextRequest, _: any, next: Function) {
  try {
    const url = request.nextUrl.searchParams.get("url");

    if (!url) throw new Error("Você precisa definir uma URL.");
    const cleanUrl = validateLongUrl(url!);

    request.nextUrl.searchParams.set("url", cleanUrl);

    return next();
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400, statusText: "invalid_input" }
    );
  }
}

router.use(validationHandler).post(async (request) => {
  const longUrl = request.nextUrl.searchParams.get("url");
  const storedUrl = await url.findOneByLongUrl(longUrl!);

  let shortCode = storedUrl?.shortCode;

  if (!shortCode) {
    shortCode = await createUniqueShortCode();
    await url.create({ longUrl: longUrl!, shortCode });
  }

  const shortenedUrl = `${host()}/${shortCode}`;
  return NextResponse.json({ newUrl: shortenedUrl }, { status: 201 });
});

export async function POST(request: NextRequest, ctx: NextContext) {
  return router.run(request, ctx);
}
