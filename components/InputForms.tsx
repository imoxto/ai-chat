'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { set, useForm } from "react-hook-form";
import { useChat } from "ai/react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  Name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  Location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  Description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  AdditionalInfo: z.string().min(2, {
    message: "Additional Info must be at least 2 characters.",
  }),
});

export default function InputForms({ input, handleSubmit, setInput }: any) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      Location: "",
      Description: "",
      AdditionalInfo: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setInput(
      // TODO: Template the string below.
      `${values.Description}  + ${values.AdditionalInfo} + ${values.Location} + ${values.Name}`
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          form.handleSubmit(onSubmit)(e);
          handleSubmit(e);
        }}
        className="space-y-8"
      >
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="Location"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Los gatos, CA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How can we help you?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="I want to build a custom AI chatbot for my e-commerce business that can serve as a customer care representative..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="AdditionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provide Addition information</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Here are the details of my project..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
