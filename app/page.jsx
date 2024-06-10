"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Hero from "@/app/components/Hero";
import Nav from "./components/Nav";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export default function Home() {
  const newtheme = extendTheme({
    colors: {
      darkbg: "#18181B",
      royalblue: {
        50: "#f1f4fd",
        100: "#dfe7fa",
        200: "#c5d5f8",
        300: "#9ebbf2",
        400: "#7097ea",
        500: "#4169e1",
        600: "#3957d7",
        700: "#3044c5",
        800: "#2d39a0",
        900: "#29347f",
        950: "#1d224e",
      },
    },
  });

  return (
    <main className="bg-darkbg min-h-screen h-full">
      <ChakraProvider theme={newtheme}>
        <SignedIn>
          <Nav />
        </SignedIn>
        <SignedOut>
          <Hero />
        </SignedOut>
      </ChakraProvider>
    </main>
  );
}
