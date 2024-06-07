"use client";
import {
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import Hero from '@/components/hero';
import Nav from '../components/nav';
export default function Home() {
  const userName = "User";

  return (<>
        <SignedIn>
          <Nav />
        </SignedIn>
        <SignedOut>
        <Hero />
        </SignedOut>
  </>);
}
