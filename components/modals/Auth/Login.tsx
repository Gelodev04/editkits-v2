import Typography from "@/components/Typography";
import TextField from "@/components/TextField";
import Toggle from "@/components/Toggle";
import Button from "@/components/Button";
import React from "react";
import {AuthModalProps} from "@/components/modals/Auth/index";

export default function Login(props: AuthModalProps) {
    return (
        <>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex justify-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                        <Typography
                            label={props.type}
                            center
                            variant="h2"
                        />

                        <div className="mt-2">
                            <Typography
                                label="Welcome back! Please enter your details"
                                center
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-10">
                <TextField label="Email" placeholder="Your email"/>
                <div className="py-4">
                    <TextField label="Password" placeholder="Your password"/>
                </div>
                <div className="py-3">
                    <div className="pb-2">
                        <Toggle name="remember-me" label="Remember me"/>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="py-3 sm:flex flex justify-center w-[40%]">
                    <Button label="Signup" variant="secondary" filled/>
                </div>
            </div>
            <div className="flex justify-center pb-10">
                <Button onClick={() => props.setType("Sign Up")} label="Signup" variant="primary" filled width={40} />
            </div>
        </>
    )
}