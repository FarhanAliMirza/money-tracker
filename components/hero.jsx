import { useRouter } from "next/navigation";
import { Button } from '@chakra-ui/react'
const Hero = () => {
    const router = useRouter();
    return (
        <div className="bg-royalblue py-16">
            <div className="container mx-auto text-center">
                <h1 className="text-white text-4xl font-bold mb-4">Money Tracker App</h1>
                <p className="text-white text-lg mb-8">Track your expenses and manage your finances with ease.</p>
                <Button color={"teal"} onClick={()=> router.push("/sign-up")}>Get Started</Button>
            </div>
        </div>
    );
};

export default Hero;