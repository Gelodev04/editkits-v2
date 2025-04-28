import Tag from '@/components/Tag';
import Typography from '@/components/Typography';
import BenefitCard from '@/components/cards/BenefitCard';

import Button from '@/components/ui/button/Button';

export function Subscription(props: any) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] mx-auto lg:mx-0 w-full max-w-[385px]">
      <div className="col-span-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between pb-8">
          <Typography label="Free Plan" variant="bb1" />
          <Tag label="500 credits / month" variant="md" />
        </div>
        <div className="flex items-end pt-4">
          <p className="text-5xl font-lato font-bold text-[#0b0e0d] dark:text-white/90">$0</p>
          <Typography label="/ month" bold className="italic text-xl font-lato" />
        </div>
        <div className="flex gap-2 pb-8">
          <p className="text-[#838696] dark:text-white/90 font-lato font-normal text-base">
            Billed
          </p>
          <p className="text-[#838696] dark:text-white/90 font-lato font-normal text-base">
            monthly
          </p>
        </div>
        <p className="font-medium font-lato  text-base text-[#4f4f4f] dark:text-white/90">
          Next credits renew date
        </p>
        <p className="text-lg text-[#2c2c2c] dark:text-white/90 font-bold font-lato">
          24th December 2024
        </p>
      </div>
      <div className="h-full border-r-2 border-dashed border-[#e2e4e9] w-12" />
      <div className="col-span-5">
        <div className="pt-3">
          {props.benefits.map((benefit: any) => (
            <BenefitCard label={benefit} />
          ))}
        </div>
      </div>
      <div className="col-span-2 pt-3 flex items-end justify-end">
        <Button variant="primary" size="md">
          Change plan
        </Button>
      </div>
    </div>
  );
}
