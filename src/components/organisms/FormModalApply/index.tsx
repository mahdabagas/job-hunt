"use client"

import { FC } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formApplySchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadField from "../UploadFIeld";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { supabaseUploadFile } from "@/lib/supabase";


interface FormModalApplyProps {
    image: string | undefined;
    roles: string | undefined;
    location: string | undefined;
    jobType: string | undefined;
    id: string | undefined;
    isApply: number | undefined;
}
 
const FormModalApply: FC<FormModalApplyProps> = ({image, roles, location, jobType, id, isApply}) => {
    const {data: session} = useSession();
    const { toast } = useToast();
    const router = useRouter();
    const isApplyVal = isApply!! === 1;

    const form = useForm<z.infer<typeof formApplySchema>>({
        resolver: zodResolver(formApplySchema)
    })

    const onSubmit = async (val: z.infer<typeof formApplySchema>) => {
        try {
            const {filename, error} = await supabaseUploadFile(val.resume, "applicant");


            const reqData = {
                userId: session?.user?.id,
                jobId: id,
                resume: filename,
                coverLetter: val.coverLetter,
                linkedin: val.linkedIn,
                phone: val.phone,
                portfolio: val.portofolio,
                previousJobTitle: val.previousJobTitle
            };

            if (error) {
                throw "Error"
            }

            await fetch('/api/job/apply', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(reqData)
            }).then((res) => {

                if (res.status !== 200) {
                    toast({
                        title: 'Error',
                        description: 'Please Try Again '
                    })
                    return;
                }

                toast({
                    title: 'Success',
                    description: 'Apply job success'
                })

                router.replace('/')
            })

        } catch (error) {
            toast({
                title: 'Errorr',
                description: 'Please Try Again '
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {session ? (
                    <Button className={`text-lg px-12 py-6" size="lg ${isApplyVal ? 'bg-green-500' : ' '}`} disabled={isApplyVal}>{isApplyVal ? "Applied" : 'Apply'}</Button>
                ) : (
                    <Button variant="outline" disabled>Sign in First</Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <div>
                    <div className="inline-flex items-center gap-4">
                        <div>
                            <Image src={image!!} alt={image!!} width={60} height={60} />
                        </div>
                        <div>
                            <div className="text-lg font-semibold">
                                {roles}
                            </div>
                            <div className="text-gray-500">
                                {location} . {jobType}
                            </div>
                        </div>
                    </div>

                    <Separator className="my-5" />

                    <div className="mb-5">
                        <div className="font-semibold text-lg">
                            Submit your application
                        </div>
                        <div className="text-gray-500 text-sm mt-2">
                            The following is required and will only be share with Nomad
                        </div>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="fullname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fullname</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your fullname" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your phone number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="previousJobTitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current of previous job title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="What's your current of previous job title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Separator/>
                            <h2 className="font-semibold">LINKS</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="linkedIn"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>LinkedIn URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Link to your linked URL" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="portofolio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Portofolio URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Link to your portfolio URL" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="coverLetter"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Additional Information</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Add a cover letter or anything else you want to share" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <UploadField form={form}/>

                            <Button className="w-full">Apply</Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default FormModalApply;