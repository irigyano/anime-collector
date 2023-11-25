"use client";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/app/components/ui/form";
import { Textarea } from "@/app/components/ui/textarea";
import toast from "react-hot-toast";
import { useEffect } from "react";

const FormSchema = z.object({
  comment: z.string().min(1),
});

function TextareaForm() {
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const currentUser = useAppSelector((state) => state.user.user);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { comment } = data;
    // is closure problematic?
    if (!currentUser) return toast.error("請先登入", { id: "error" });

    // await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve("done");
    //   }, 3000);
    // });

    toast.success("發表成功");
  }

  // clean up after submit
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) form.reset({ comment: "" });
  }, [form.formState.isSubmitSuccessful]);

  return (
    <>
      <Form {...form}>
        <form
          // triggered when mouse click on button
          onSubmit={form.handleSubmit(onSubmit)}
          // triggered when pressing enter without shift on keyboard
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              form.handleSubmit(onSubmit)();
            }
          }}
          className="flex flex-col gap-2 p-2"
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="發表你的留言"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            variant="outline"
            type="submit"
            disabled={!form.formState.isValid}
          >
            留言
          </Button>
        </form>
      </Form>
    </>
  );
}

export default TextareaForm;
