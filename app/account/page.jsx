"use client";
import AddAccount from "@/app/components/AddAccount";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import AccountTransactions from "@/app/components/AccountTransactions";
import Nav from "../components/nav";

const Account = () => {
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
        <AddAccount />
        <AccountTransactions />
      </ChakraProvider>
    </div>
  );
};
export default Account;
