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
import { WorkData } from "@/app/types/types";
import UserComments from "./UserComments";

const FormSchema = z.object({
  comment: z.string().min(1),
});

function TextareaForm({ work }: { work: WorkData }) {
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const currentUser = useAppSelector((state) => state.user.user);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ comment: data.comment, workId: work.annictId }),
    });
    const newComment = await res.json();
    if (newComment) {
      toast.success("發表成功");
      fetch("/api/activity", {
        method: "POST",
        body: JSON.stringify({
          action: "COMMENT",
          annictId: work.annictId,
          workTitle: work.title,
        }),
      });
    } else toast.error("something went wrong");
  }

  function checkUserBeforeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!currentUser) return toast.error("請先登入", { id: "error" });
    form.handleSubmit(onSubmit)();
  }

  // clean up after submit
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) form.reset({ comment: "" });
  }, [form.formState.isSubmitSuccessful]);

  return (
    <div className="px-6">
      <Form {...form}>
        <form
          // triggered when mouse click on button
          onSubmit={checkUserBeforeSubmit}
          // triggered when pressing enter without shift on keyboard
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              checkUserBeforeSubmit(e);
            }
          }}
          className="flex flex-col gap-2"
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
      <UserComments form={form} workId={work.annictId} />
    </div>
  );
}

export default TextareaForm;
