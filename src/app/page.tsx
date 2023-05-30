"use client";

import Button from "@/app/components/Button";
import { MdOutlineContentCut, MdOutlineContentCopy } from "react-icons/md";
import TextInput from "./components/Text";
import Modal from "./components/Modal";
import { useState } from "react";
import { validateLongUrl } from "@/util/url";

async function getShortUrl(longUrl: string) {
  const response = await fetch(`/create?url=${longUrl}`, { method: "POST" });
  const responseBody = (await response.json()) as {
    newUrl: string;
    error?: string;
  };

  return Object.assign(responseBody, {
    statusCode: response.status,
  });
}

interface GlobalErrorProps {
  message?: string;
  statusCode?: number;
}

export default function Home() {
  const [globalError, setGlobalError] = useState<GlobalErrorProps>();
  const [shortUrl, setShortUrl] = useState<string>();
  const [modalOpen, setModalOpen] = useState(false);
  const [longUrl, setLongUrl] = useState<string>();

  async function handleShortener() {
    if (longUrl) {
      try {
        const cleanLongUrl = validateLongUrl(longUrl);
        const { newUrl, error, statusCode } = await getShortUrl(cleanLongUrl);

        if (error) {
          setGlobalError({ message: error, statusCode: statusCode });
          setModalOpen(true);
        } else {
          setShortUrl(newUrl);
        }
      } catch (error) {
        let typedError = error as Error;
        setGlobalError({ message: typedError.message, statusCode: 403 });
        setModalOpen(true);
      }
    }
  }

  function copyToClipboard() {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
    }
  }

  return (
    <div className="bg-gray-800 selection:bg-cyan-700 flex-wrap selection:text-cyan-50 w-screen h-screen flex justify-center items-center gap-10">
      <div className="flex flex-col">
        <span className="text-gray-600 text-2xl">Encurtador de Links</span>
        <Modal
          changeState={setModalOpen}
          message={globalError?.message!}
          statusCode={globalError?.statusCode!}
          open={modalOpen}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <TextInput
            onChange={(event) => {
              setLongUrl(event.target.value);
              setGlobalError({});
            }}
            placeholder="Cole aqui seu URL"
            className={`bg-gray-900 w-[320px] p-2 pl-4 pr-4 outline-none placeholder:text-gray-700 ${
              globalError?.message && "border-red-400 text-red-400 border-2"
            }`}
          />
          <Button
            onClick={handleShortener}
            className="bg-gray-900 group p-2 h-10 w-10 flex justify-center items-center"
          >
            <MdOutlineContentCut
              size={20}
              className="group-hover:fill-cyan-600 fill-gray-700"
            />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <TextInput
            disabled
            value={shortUrl}
            placeholder="URL Encurtado"
            className="bg-gray-900 w-[320px] p-2 pl-4 pr-4 outline-none placeholder:text-gray-700"
          />
          <Button
            disabled={!shortUrl}
            onClick={copyToClipboard}
            className="bg-gray-900 group p-2 h-10 w-10 flex justify-center items-center"
          >
            <MdOutlineContentCopy
              size={20}
              className={"fill-gray-700 group-hover:fill-cyan-600"}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
