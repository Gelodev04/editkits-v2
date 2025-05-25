import React from "react";
import {useRouter} from "next/router";
import Image from "next/image";

import {Divider} from "@mui/material";

import Alert from "@/components/Alert";
import ArticleLoading from "@/pages/blog/[slug]/loading";
import Typography from "@/components/Typography";
import {convertToNoCookieUrl} from "@/lib/utils";
import {CodeBlock} from "@/components/CodeBlock";

export default function Article({article}) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (router.isFallback || loading) {
    return <ArticleLoading />;
  }

  function boldText(text) {
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <span className="font-lato font-bold text-base leading-[24px] text-[#4f4f4f] dark:text-[#b0b0b0] py-[12px] "
              key={index}>{part.slice(2, -2)}</span>
      ) : (
        part
      )
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto pb-[147px] pt-[12px] px-2">
      {article?.content.map((content) => {
        if (content.type === "heading") {
          if (content.style === "large") {
            return (
              <h1
                className="font-montserrat font-bold text-[40px] sm:text-[48px] leading-[64px] text-[#2c2c2c] dark:text-[#d5d7da] py-[12px]">{boldText(content.value)}</h1>
            )
          }
          if (content.style === "medium") {
            return (
              <div className="py-[12px]">
                <Typography label={boldText(content.value)} variant="h4"/>
              </div>
            )
          }
          if (content.style === "small") {
            return (
              <div className="py-[12px]  ">
                <Typography label={boldText(content.value)} variant="h6"/>
              </div>
            )
          }
        }
        if (content.type === "text") {
          return (
            <p
              className="font-lato font-normal text-base leading-[24px] text-[#4f4f4f] dark:text-[#d5d7da] py-[12px]">{boldText(content.value)}</p>
          )
        }
        if (content.type === "image") {
          return (
            <div className="flex justify-center py-[12px] max-h-[570px]">
              <Image
                className="rounded-[8px] object-cover"
                src={content.src}
                width={1280}
                height={570}
                alt={content.alt}
                priority
                quality={75}
              />
            </div>
          )
        }
        if (content.type === "video") {
          return (
            <div className="flex justify-center py-[12px] max-h-[580px]">
              <video className="rounded-[4px]" width={1280} height={506} controls>
                <source src={content.src}/>
              </video>
            </div>
          )
        }
        if (content.type === "embed") {
          return (
            <div className="flex justify-center py-[12px]">
              <iframe
                width="1280px"
                height="580px"
                src={convertToNoCookieUrl(content.src)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )
        }
        if (content.type === "list") {
          if (content.style === "unordered") {
            return (
              <ul className="list-disc py-[12px] pl-[26px] space-y-[16px]">
                {content.items.map((item, index) => (
                  <li
                    key={index}
                    className="font-lato font-normal text-base leading-[24px] text-[#4f4f4f] dark:text-[#d5d7da]"
                  >
                    {boldText(item)}
                  </li>
                ))}
              </ul>
            );
          }

          if (content.style === "ordered") {
            return (
              <ol className="list-decimal py-[12px] pl-[26px] space-y-[16px]">
                {content.items.map((item, index) => (
                  <li
                    key={index}
                    className="font-lato font-normal text-base leading-[24px] text-[#4f4f4f] dark:text-[#d5d7da]"
                  >
                    {boldText(item)}
                  </li>
                ))}
              </ol>
            );
          }
        }

        if (content.type === "divider") {
          return (
            <div className="py-[12px]">
              <Divider sx={{borderBottomWidth: 3}} orientation="horizontal" flexItem/>
            </div>
          )
        }

        if (content.type === "space") {
          return (
            <div style={{paddingTop: content.px}}/>
          )
        }

        if (content.type === "callout") {
          return (
            <div className="py-[12px] ">
              <Alert label={boldText(content.value)} mode={content.style}/>
            </div>
          )
        }

        if (content.type === "code") {
          return (
            <div className="py-[12px]">
              <CodeBlock content={content}/>
            </div>
          );
        }
      })}
    </div>
  );
}

export async function getServerSideProps({params}) {
  const {slug} = params;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/blog/entry?slug=${slug}`);
    if (!response.ok) {
      return {notFound: true};
    }

    const article = await response.json();
    if (!article) {
      return {notFound: true};
    }

    return {
      props: {
        article
      }
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return {notFound: true};
  }
}



