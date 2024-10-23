"use client"

import React, {useState} from "react";
import Signup from "@/components/modals/Auth/Signup";
import Login from "@/components/modals/Auth/Login";
import {TbXboxX} from "react-icons/tb";
import Verification from "@/components/modals/Auth/Verification";

export type AuthModalProps = {
    type: string;
    showAuthModal: boolean;
    setAuthModal: (e: React.SetStateAction<boolean>) => void;
    setType: (e: React.SetStateAction<string>) => void;
    description?: string;
}

export default function AuthModal(props: AuthModalProps) {
    const [password, setPassword] = useState("");
    const [code, setCode] = useState<string[]>(Array(5).fill(''));

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div
                        className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ">
                        <div className="absolute right-2 top-2 cursor-pointer">
                            <TbXboxX size={30} color="#000" onClick={() => props.setAuthModal(false)} />
                        </div>
                        {props.type === "Sign Up" && Signup(props, password, setPassword)}
                        {props.type === "Log In" && Login(props)}
                        {props.type === "Enter verification code" && Verification({props, code, setCode})}
                    </div>
                </div>
            </div>
        </div>
    )
}