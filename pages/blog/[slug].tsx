import {useRouter} from "next/router";
import Image from "next/image";
import {useGetArticleQuery} from "@/services/api";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {convertToNoCookieUrl} from "@/lib/utils";

export default function Article() {
  const router = useRouter();
  const { slug } = router.query;

  const {data: article, isLoading, isError, error}: any = useGetArticleQuery({slug});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("Article not found or error occurred", error);
    return <div>Article not found.</div>;
  }

  return (
    <div className="max-w-[1280px] mx-auto pb-[147px]">
      <h1
        className="font-montserrat font-bold text-[48px] leading-[64px] text-[#2c2c2c] pt-[83px] ">{article?.metadata.meta_title}</h1>
      <p
        className="font-lato font-normal text-base leading-[24px] text-[#4f4f4f] py-[58px]">{article?.metadata.meta_description}</p>

      {article?.content.map((content) => {
        if (content.type === "heading_l") {
          return (
            <h1
              className="font-montserrat font-bold text-[18.2px] leading-[64px] text-[#2c2c2c]  pb-[16px]">{content.value}</h1>
          )
        }
        if (content.type === "text") {
          return (
            <p className="font-lato font-normal text-base leading-[24px] text-[#4f4f4f] pb-[14px]">{content.value}</p>
          )
        }
        if (content.type === "image") {
          return (
            <div className="flex justify-center pb-[45px] h-[570px]">
              <Image src={content.src} width={1280} height={1240} alt={content.alt} unoptimized priority/>
            </div>
          )
        }
        if (content.type === "video") {
          return (
            <div className="flex justify-center pt-[14px] max-h-[580px]">
              <video className="rounded-[4px]" width={1280} height={506} controls>
                <source src={content.src}/>
              </video>
            </div>
          )
        }
        if (content.type === "embed") {
          return (
            <div className="flex justify-center pt-[14px]">
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
              <ul className="list-disc">
                {content.items.map((item, index) => (
                  <li
                    key={index}
                    className="font-lato font-normal text-base leading-[24px] text-[#4f4f4f] pt-[16px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          if (content.style === "ordered") {
            return (
              <ol className="list-decimal">
                {content.items.map((item, index) => (
                  <li
                    key={index}
                    className="font-lato font-normal text-base leading-[24px] text-[#4f4f4f] pt-[16px]"
                  >
                    {item}
                  </li>
                ))}
              </ol>
            );
          }
        }
        if (content.type === "code") {
          return (
            <div className="pt-[24px]">
              <SyntaxHighlighter language={content.language}>
                {content.value}
              </SyntaxHighlighter>
            </div>
          );
        }
      })}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/entry?slug=${slug}`);
  const article = await response.json();


  return {
    props: {
      article
    }
  };
}

