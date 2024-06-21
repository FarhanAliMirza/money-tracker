import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";
const Hero = () => {
  const router = useRouter();
  return (
    <div className="bg-royalblue py-16 flex flex-col gap-9 items-center h-full justify-center w-full min-h-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="container mx-auto text-center flex flex-col gap-2 items-center w-full">
        <h1
          className="scroll-m-20 px-3 py-3 text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight lg:text-7xl text-center max-w-[1120px] bg-gradient-to-b from-black to-gray-700/80 dark:from-white dark:to-slate-400 inline-block text-transparent bg-clip-text"
        >
          Money Tracker App
        </h1>

        <p className="mx-auto max-w-[700px] text-gray-800 text-sm md:text-lg text-center lg:mt-2 mt-5 dark:text-gray-400 px-3">
          Track your expenses and manage your finances with ease.
        </p>
      </div>
      <div className="z-20">
        <Button
          color={"royalblue"}
          mr={3}
          onClick={() => router.push("/sign-up")}
        >
          Get Started
        </Button>
        <Button color={"royalblue"} onClick={() => router.push("/sign-in")}>
          Sign In
        </Button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:30px_34px]" />
    </div>
  );
};

export default Hero;
