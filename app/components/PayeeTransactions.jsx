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

const PayeeTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState("12");
  const [loans, setLoans] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [payees, setPayees] = useState([]);
  const [payee, setPayee] = useState("");
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
    const q = query(collection(db, "payees"), where("createdBy", "==", userId));
    const unsubscibe = onSnapshot(q, (querySnapshot) => {
      let payeesArray = [];
      querySnapshot.forEach((doc) => {
        payeesArray.push({ ...doc.data(), id: doc.id });
      });
      setPayees(payeesArray);
      return () => unsubscibe();
    });
  }, []);

  useEffect(() => {
    filterTransactions(payee, month);
  }, [transactions]);

  const filterTransactions = (payee, month, loans) => {
    const filteredPayee = transactions.filter(
      (transaction) => transaction.payee === payee
    );
    if (month === "12") {
      setFilteredTransactions(filteredPayee);
    } else {
      const filtered = filteredPayee.filter(
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
            placeholder="Select Payee"
            value={payee}
            onChange={(e) => setPayee(e.target.value)}
            list="payees"
          />
          <datalist id="payees">
            {payees.map((payee) => (
              <option key={payee.id} value={payee.name} />
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
            onClick={() => filterTransactions(payee, month, loans)}
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

export default PayeeTransactions;