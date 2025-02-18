import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  TelegramIcon,
} from "react-share";

export default function Sharepage({ url }) {
  return (
    <>
      <div className="p-5 bg-white rounded-lg ">
        <h2 className="text-lg font-semibold mb-2 text-center text-black">
          Share this News
        </h2>
        <hr className="mb-4 bg-gray-800 border-none h-[1px]" />

        <div className="flex justify-center gap-4">
          <FacebookShareButton url={url}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <TwitterShareButton url={url}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>

          <WhatsappShareButton url={url}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>

          <LinkedinShareButton url={url}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>

          <TelegramShareButton url={url}>
            <TelegramIcon size={40} round />
          </TelegramShareButton>
        </div>
      </div>
    </>
  );
}
