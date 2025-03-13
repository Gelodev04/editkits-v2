import Typography from "@/components/Typography";
import Tag from "@/components/Tag";
import BenefitCard from "@/components/cards/BenefitCard";
import Button from "@/components/Button";
import * as React from "react";

export function Subscription(props: any) {
  return (
    <div
      className="rounded rounded-2xl border border-solid border-slate-50 grid grid-cols-12 p-8 shadow-lg min-h-[306px]">
      <div className="col-span-4">
        <div className="flex justify-between pb-8">
          <Typography label="Free Plan" variant="bb1"/>
          <Tag label="500 credits / month" variant="md"/>
        </div>
        <div className="flex items-end pt-4">
          <p className="text-5xl font-lato font-bold text-[#0b0e0d]">$0</p>
          <Typography label="/ month" bold className="italic text-xl font-lato"/>
        </div>
        <div className="flex gap-2 pb-8">
          <p className="text-[#838696] font-lato font-normal text-base">Billed</p>
          <p className="text-[#838696] font-lato font-normal text-base">monthly</p>
        </div>
        <p className="font-medium font-lato  text-base text-[#4f4f4f]">Next credits renew date</p>
        <p className="text-lg text-[#2c2c2c] font-bold font-lato">24th December 2024</p>
      </div>
      <div className="h-full border-r-2 border-dashed border-[#e2e4e9] w-12"/>
      <div className="col-span-5">
        <div className="pt-3">
          {props.benefits.map((benefit: any) => <BenefitCard label={benefit}/>)}
        </div>
      </div>
      <div className="col-span-2 pt-3 flex items-end justify-end">
        <Button label="Change plan" variant="contained" className="py-3 max-w-[152px]" filled/>
      </div>
    </div>
  )
}