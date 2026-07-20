"use client";

import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { TreePine, Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4">
      <div className="mb-8 flex flex-col items-center">
        <Link href="/" className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4">
          <TreePine className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Login Administrator</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Masuk untuk mengelola website Desa Balesari
        </p>
      </div>

      <div className="w-full max-w-sm rounded-2xl border border-border/50 bg-card p-8 shadow-lg">
        <form action={formAction} className="flex flex-col gap-5">
          {state?.error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {state.error}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="admin@balesari.id"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <Button type="submit" disabled={isPending} className="mt-2 w-full">
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Masuk ke Dashboard
          </Button>
        </form>
      </div>
    </div>
  );
}
