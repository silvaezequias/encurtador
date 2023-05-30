import ms from "ms";
import database from "@/database";
import { Url } from "@prisma/client";

const URL_EXPIRES_AT = Date.now() + ms("1 days");

async function create(data: Pick<Url, "longUrl" | "shortCode">) {
  const urlObject = await database.url.create({
    data: {
      longUrl: data.longUrl,
      shortCode: data.shortCode,
      expiresAt: new Date(URL_EXPIRES_AT),
    },
  });

  return urlObject;
}

async function findOneByShortCode(shortCode: string) {
  const result = await database.url.findUnique({
    where: { shortCode },
  });

  return result;
}

async function findOneByLongUrl(longUrl: string) {
  const result = await database.url.findUnique({
    where: { longUrl },
  });

  return result;
}

const url = {
  create,
  findOneByLongUrl,
  findOneByShortCode,
};

export default url;
