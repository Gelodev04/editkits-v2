import React from "react";
import toast from "react-hot-toast";
import {IoCopy} from "react-icons/io5";
import {Highlight, themes} from "prism-react-renderer"

export function CodeBlock({content}) {
  const copyToClipboard = () => {
    if (!content?.value) return;
    navigator.clipboard.writeText(content.value).then(() => {
      toast.success("Copied to clipboard!");
    });
  };

  return (
    <div className="relative group font-mono text-sm">
      <Highlight
        theme={themes.oneLight}
        code={content.value}
        language={content.language}
      >
        {({ style, tokens, getLineProps, getTokenProps}) => (
          <pre style={style} className="relative pt-8 pb-4 px-4 cursor-pointer">
            <div className="flex absolute right-3 text-xs items-start top-0 pt-2" onClick={copyToClipboard}>
              <IoCopy color="#2c2c2c" size={20}/>
            </div>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({line})}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({token})} />
                ))}
              </div>
            ))}
      </pre>
        )}
      </Highlight>
    </div>
  );
}
