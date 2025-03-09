import NotFoundImg from "@/public/assets/img/404.svg"
import Image from "next/image";
import {lato, montserrat} from "@/lib/fonts";
import Button from "@/components/Button";
import {useRouter} from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className={`${montserrat.variable} ${lato.variable} max-w-[618px] pt-[49px] mx-auto pb-[87px]`}>
      <Image
        src={NotFoundImg}
        alt="not found image"
        width={618}
        height={526}
      />
      <h2 className="text-center font-montserrat font-extrabold text-[36px] leading-[45px] text-[#262628] pt-[32px] pb-[12px]">Page not found</h2>
      <p className="font-lato font-normal text-sm leading-[21px] text-[#000000] text-center">Oops! It looks like the page you&apos;re looking for doesn&apos;t exist.</p>
      <div className="max-w-[209px] mx-auto pt-[32px]">
        <Button onClick={() => router.back()} label="Back" variant="secondary" />
      </div>
    </div>
  );
}