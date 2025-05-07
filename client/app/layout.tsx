import type { Metadata } from "next";
import "./globals.css";
import ConvexClientProvider from "@/utils/context/convex-client-provider";
// import UserNotifications from "@/components/Notification/UserNotifications";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: {
    default: "Tic-Tac-Toe 🎮",
    template: "%s | Tic-Tac-Toe 🎮",
  },
  description: "A fun multiplayer game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("rerender RootLayout");

  return (
    <html lang="en">
      <body
        className={`antialiased bg-seconday flex justify-center items-center`}
      >
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
          <ConvexClientProvider>
            <main className="h-[95%] w-[95%] text-white rounded-xl flex flex-row justify-between items-center gap-6">
              {/* <AppProviders> */}
              {/* <UserNotifications /> */}

              {children}
              {/* </AppProviders> */}
            </main>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
