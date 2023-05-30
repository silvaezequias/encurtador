import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Button from "./Button";

interface ModalProps {
  open: boolean;
  message: string;
  statusCode: number;
  changeState: (value: boolean) => void;
}

export default function Modal(props: ModalProps) {
  return (
    <>
      {props.open ? (
        <div
          className={[
            "flex",
            "justify-center",
            "w-screen",
            "h-screen",
            "items-center",
            "overflow-x-hidden",
            "overflow-y-auto",
            "fixed",
            "inset-0",
            "z-50",
            "outline-none",
            "focus:outline-none",
            "bg-gray-950",
            "bg-opacity-80",
          ].join(" ")}
        >
          <div className="w-[500px] bg-gray-900 rounded">
            <div className="border-b-[1px] items-center flex justify-between border-red-500 pl-5 pr-5 pt-2 pb-2">
              <span>Erro - {props.statusCode}</span>
              <Button
                onClick={() => {
                  props.changeState(false);
                }}
              >
                <MdClose size={20} />
              </Button>
            </div>
            <div className="font-light p-5">{props.message}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
