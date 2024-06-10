"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  Container,
  Stack,
  Input,
  Select,
  IconButton,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import ViewTransactions from "./ViewTransactions";
import { m } from "framer-motion";

const AccountTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState("12");
  const [loans, setLoans] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState("");
  const { userId, isLoaded } = useAuth();

  useEffect(() => {
    const q = query(collection(db, "transactions"),where("createdBy", "==", userId));
    const unsubscibe = onSnapshot(q, (querySnapshot) => {
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push({ ...doc.data(), id: doc.id });
      });
      setTransactions(transactionsArray);
      return () => unsubscibe();
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "accounts"), where("createdBy", "==", userId));
    const unsubscibe = onSnapshot(q, (querySnapshot) => {
      let accountsArray = [];
      querySnapshot.forEach((doc) => {
        accountsArray.push({ ...doc.data(), id: doc.id });
      });
      setAccounts(accountsArray);
      return () => unsubscibe();
    });
  }, []);

  useEffect(() => {
    filterTransactions(account, month);
  }, [transactions]);

  const filterTransactions = (account, month, loans) => {
    const filteredAccount = transactions.filter(
      (transaction) => transaction.account === account
    );
    if (month === "12") {
      setFilteredTransactions(filteredAccount);
    } else {
      const filtered = filteredAccount.filter(
        (transaction) => new Date(transaction.date).getMonth() == month
      );
      setFilteredTransactions(filtered);
    }
    if (loans) {
      const filteredLoans = filteredTransactions.filter(
        (transaction) => transaction.loan.isLoan == true
      );
      setFilteredTransactions(filteredLoans);
    }
  };
  return (
    <>
      <Container
        minW={"xs"}
        maxW={"lg"}
        mt={"24px"}
        p={"3"}
        borderRadius={"lg"}
        bg={"royalblue.950"}
      >
        <div className="text-royalblue-300 my-4 mx-2">View Transactions</div>
        <Stack spacing={2} direction={"row"}>
          <Input
            color={"royalblue.300"}
            placeholder="Select Account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            list="accounts"
          />
          <datalist id="accounts">
            {accounts.map((Account) => (
              <option value={Account.name} />
            ))}
          </datalist>
          <Select
            value={month}
            color={"royalblue.300"}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="12">All Months</option>
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
            <option value="5">June</option>
            <option value="6">July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
          </Select>
          <IconButton
            colorScheme="royalblue"
            onClick={() => filterTransactions(account, month, loans)}
            icon={<SearchIcon />}
          />
        </Stack>
        <Stack spacing={2} pt={2} direction={"row"}>
          <FormLabel color={"royalblue"}>Show Loans Only</FormLabel>
          <Switch onChange={(e) => setLoans(e.target.checked)} />
        </Stack>
        <ViewTransactions transactions={filteredTransactions} />
      </Container>
    </>
  );
};

export default AccountTransactions;