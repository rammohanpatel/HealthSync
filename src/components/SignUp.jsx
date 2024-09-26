"use client"
import React from 'react'
import Image from 'next/image'
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa6";
import Link from 'next/link'

const signUpSchema = z.object({
    name: z.string().min(2, "Name Should have atleast 2 characters.").max(50, "Name should not exceed 50 characters.").refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value), 'Name should contain only alphabets.'),
    email: z.string().email("Email must be valid."),
    password: z.string().min(6, "Password Should have atleast 6 characters."),
    confirmPassword: z.string().min(6, "Password Should have atleast 6 characters.")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match.",
    path: ["confirmPassword"],
});

const SignUp = () => {
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
    })

    function onSubmit(values) {
        console.log(values)
    }

    const [signInToggle, setSignInToggle] = useState(false);

  return (
    <>
    <div className="signUpWrapper">
        <div className='flex flex-row space-x-3'>
           <h1 className="text-3xl text-center mt-28">Welcome to HealthSync</h1>
           {/* <Image src='/logo.png' width={150} height={50} className='' /> */}
        </div>
   
        <div className="">
            <div className="formWrapper">
                <div className="left">
                    <h3 className="title">Welcome Back!</h3>
                    <p>To keep connected with us please login with your personal info</p>                  
                    <Button onClick = {()=>setSignInToggle(!signInToggle)} className='border-zinc-500 text-zinc-300 hover:border-zinc-200 hover:text-zinc-100 transition-colors border rounded-full px-8'>{signInToggle===false?'SignIn':'SignUp'}</Button>    
                </div>
                {signInToggle===true ? 
                <div className="right">
                <h3 className='text-center text-2xl font-semibold'>SignIn Here</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className='space-y-0 mb-2'>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="admin@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className='space-y-0 mb-2'>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="********" type='password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />             
                        <Button type="submit" className='w-full'>Submit</Button>
                    </form>
                </Form>
            </div>
                :
                <div className="right">
                    <h3 className='text-center text-2xl font-semibold'>Register Here</h3>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className='space-y-0 mb-2'>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Jhon Deo" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className='space-y-0 mb-2'>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="admin@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className='space-y-0 mb-2'>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="********" type='password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className='space-y-0 mb-2'>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="********" type='password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className='w-full'>Submit</Button>
                        </form>
                    </Form>
                </div>
                }
            </div> 
        </div>
       </div>
    </>
  )
}

export default SignUp;