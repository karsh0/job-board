"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Signup() {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    async function signupHandler(e: React.FormEvent) {
        e.preventDefault();
        const name = nameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            const res = await axios.post('/api/user', { name, email, password });
            const data = await res.data;
            console.log(data)
            router.push('/signin');
        } catch (error) {
            alert("Signup failed. Try again.");
        }
    }

    return (
        <div>
            <form onSubmit={signupHandler}>
                <input type="text" ref={nameRef} placeholder="Enter your name" required />
                <input type="email" ref={emailRef} placeholder="Enter your email" required />
                <input type="password" ref={passwordRef} placeholder="Enter password" required />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}
