import * as React from "react";

import TextField from "@/components/TextField";
import Button from "@/components/Button";
import AccountType from "@/components/account/AccountType";
import Typography from "@/components/Typography";
import Tag from "@/components/Tag";
import BenefitCard from "@/components/cards/BenefitCard";
import {validateEmail} from "@/lib/validateEmail";
import ChangePasswordModal from "@/components/account/ChnagePasswordModal";

export default function Account() {
  const [active, setActive] = React.useState("email");
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isEmailValid, setEmailValid] = React.useState("");
  const [changePasswordModalVisible, setChangePasswordModalVisible] = React.useState(false)

  const benefits = [
    "No Credit Card required",
    "Max 1 concurrent job",
    "2 hours of file storage",
    "50 credits/GB for content delivery",
    "Up to Full HD (1920 x 1080) or equivalent export"
  ]

  return (
    <div className="bg-[#fafbfc] min-h-[100vh]">
      <div className="max-w-[1536px] mx-auto p-6">
        <div className="grid grid-cols-12 w-full gap-4 mx-auto">
          <div className="col-span-2 xl:col-span-2 2xl:col-span-2">
            <AccountType active={active} setActive={setActive} />
          </div>
          <div className="col-span-10 xl:col-span-10 2xl:col-span-10 bg-white min-h-[780px] px-10 py-6 w-[1121px]">
            {active === "email" && (
              <div className="pt-4 max-w-[412px]">
                <TextField
                  label="Email"
                  placeholder="Example1234@gmail.com"
                  type="email"
                  error={!isEmailValid}
                  email={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    // @ts-ignore
                    setEmailValid(validateEmail(e.target.value))
                  }}
                  disabled
                  bgColor="#fff"
                />
                <div className="pt-10">
                  <Button
                    onClick={() => setChangePasswordModalVisible(true)}
                    className="max-w-[191px] max-h-[48px] border border-2 border-neutral-300 py-[13px] text-[#4f4f4f]"
                    label="Change Password"
                    variant="contained"
                    border
                  />
                </div>
              </div>
            )}
            {active === "subscription" && <Subscription benefits={benefits}/>}
          </div>
        </div>
      </div>
      <ChangePasswordModal
        type="Change Password"
        setAuthModal={setChangePasswordModalVisible}
        showAuthModal={changePasswordModalVisible}
        // @ts-ignore
        setType={undefined}
        // @ts-ignore
        description={<>We have sent the reset code to <span className="font-bold">abc@editkits.com</span>, please enter the code below to reset your password</>}
        password={password}
        setPassword={setPassword}
      />
    </div>
  )
}

function Subscription(props: any) {
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
          {props.benefits.map((benefit: any) => <BenefitCard label={benefit} />)}
        </div>
      </div>
      <div className="col-span-2 pt-3 flex items-end justify-end">
        <Button label="Change plan" variant="contained" className="py-3 max-w-[152px]" filled />
      </div>
    </div>
  )
}