"use client";
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
import type { Work } from "@/types/work";
import UserComments from "./UserComments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserFromSession } from "@/lib/getUserAction";

const FormSchema = z.object({
  comment: z.string().min(1),
});

function TextareaForm({ work }: { work: Work }) {
  const { data: currentUser } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserFromSession(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ comment }: { comment: string }) =>
      fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({
          comment: comment,
          workId: work.annictId,
        }),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("發表成功");
      fetch("/api/activity", {
        method: "POST",
        body: JSON.stringify({
          action: "COMMENT",
          annictId: work.annictId,
          workTitle: work.title,
        }),
      });
    },
  });

  // async function onSubmit(data: z.infer<typeof FormSchema>) {
  //   mutation.mutate(data);
  // }
  function checkUserBeforeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!currentUser) return toast.error("請先登入", { id: "error" });
    form.handleSubmit(mutation.mutate as any)();
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
          onSubmit={checkUserBeforeSubmit}
          // triggered when pressing enter without shift on keyboard
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              checkUserBeforeSubmit(e);
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
      <UserComments workId={work.annictId} />
    </>
  );
}

export default TextareaForm;
