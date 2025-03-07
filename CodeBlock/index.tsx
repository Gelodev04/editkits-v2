import React from "react";
import toast from "react-hot-toast";

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'

export function CodeBlock({content}) {
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success("Copied to clipboard")
    });
  };

  return (
    <div
      onClick={() => copyToClipboard(content.value)}
      className="pt-[24px] cursor-pointer"
    >
      <SyntaxHighlighter customStyle={{fontSize: 14, paddingLeft: 30, paddingRight: 27, paddingTop: 20, paddingBottom: 20, borderRadius: 4}} language={content.language}>
        {content.value}
      </SyntaxHighlighter>
    </div>
  )
}