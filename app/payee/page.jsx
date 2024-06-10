"use client";
import AddPayee from "@/app/components/AddPayee";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import PayeeTransactions from "@/app/components/PayeeTransactions";
import Nav from "../components/nav";
import AddPayee from "../components/AddPayee";
import Nav from "../components/Nav";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import PayeeTransactions from "../components/PayeeTransactions";

const Payee = () => {
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
    <div className="bg-darkbg min-h-screen h-full">
      <ChakraProvider theme={newtheme}>
        <Nav />
        <AddPayee />
        <PayeeTransactions />
      </ChakraProvider>
    </div>
  );
};
export default Payee;
