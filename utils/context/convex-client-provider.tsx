"use client";
import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { SignedIn, SignedOut, SignIn, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <SignedOut>
        <SignIn routing="hash" />
      </SignedOut>
      <SignedIn>{children}</SignedIn>
    </ConvexProviderWithClerk>
  );
}
