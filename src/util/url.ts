import Joi from "joi";

export function CodeGenerator(length: number = 5) {
  let url = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * characters.length);
    const randomChar = characters[randomNumber];

    url += randomChar;
  }

  return url;
}

export function validateLongUrl(url: string) {
  const urlSchema = Joi.string()
    .trim()
    .max(2000)
    .replace(/\u0000/g, "")
    .pattern(
      /^https?:\/\/([-\p{Ll}\d_]{1,255}\.)+[-a-z0-9]{2,24}(:[0-9]{1,5})?([\/?#]\S*)?$/u
    )
    .messages({
      "string.max": `Sua URL deve conter no máximo {#limit} caracteres.`,
      "string.pattern.base": `Você deve inserir uma URL válida e utilizando os protocolos HTTP ou HTTPS.`,
    });

  const { value, error } = urlSchema.validate(url);

  if (error) {
    throw new Error(error.details[0].message);
  }

  return value;
}

export function host() {
  const isProduction = process.env.NODE_ENV === "production";

  const WS_HOST = process.env.WS_HOST ?? "localhost";
  const WS_PORT = process.env.WS_PORT ?? "3000";

  let dev = `http://${WS_HOST}:${WS_PORT}`;
  let prod = "https://urlcurto.vercel.app";

  return isProduction ? prod : dev;
}
