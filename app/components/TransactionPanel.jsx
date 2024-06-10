"use client";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import { useAuth } from "@clerk/nextjs";
import useShowToast from "@/hooks/useShowToast";
import ViewTransactions from "./ViewTransactions";

const TansactionsPanel = () => {
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [date1, setDate1] = useState(new Date().toISOString().split("T")[0]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [dayFilteredTransactions, setDayFilteredTransactions] = useState([]);
  const [weekFilteredTransactions, setWeekFilteredTransactions] = useState([]);
  const [monthFilteredTransactions, setMonthFilteredTransactions] = useState(
    []
  );
  const { userId, isLoaded } = useAuth();
  const showToast = useShowToast();

  useEffect(() => {
    if (!isLoaded || !userId) {
      showToast("Error", "User not authenticated", "error");
      return;
    }
    const q = query(
      collection(db, "transactions"),
      where("createdBy", "==", userId)
    );
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
    filterTransactions(date);
    filterWeekTransactions(date, date1);
    filterMonthTransactions(month);
  }, [transactions]);

  const filterTransactions = (date) => {
    setDate(date);
    const filtered = transactions.filter(
      (transactions) => transactions.date === date
    );
    setDayFilteredTransactions(filtered);
  };

  const filterWeekTransactions = (date, date1) => {
    setDate(date);
    setDate1(date1);
    const filteredWeek = transactions.filter(
      (transaction) => transaction.date >= date && transaction.date <= date1
    );
    setWeekFilteredTransactions(filteredWeek);
  };

  const filterMonthTransactions = (newMonth) => {
    setMonth(newMonth);
    const filteredMonth = transactions.filter(
      (transaction) => new Date(transaction.date).getMonth() == newMonth
    );
    setMonthFilteredTransactions(filteredMonth);
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
        <div className="text-royalblue-300 my-4">View Transactions</div>
        <Tabs variant="soft-rounded" colorScheme="royalblue">
          <TabList>
            <Tab>Date</Tab>
            <Tab>Month</Tab>
            <Tab>Custom Range</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Input
                color={"royalblue.300"}
                type="date"
                defaultValue={date}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  filterTransactions(e.target.value);
                }}
              />
              <ViewTransactions transactions={dayFilteredTransactions} />
            </TabPanel>
            <TabPanel>
              <Select
                value={month}
                color={"royalblue.300"}
                onChange={(e) => filterMonthTransactions(e.target.value)}
              >
                <option value={0}>January</option>
                <option value={1}>February</option>
                <option value={2}>March</option>
                <option value={3}>April</option>
                <option value={4}>May</option>
                <option value={5}>June</option>
                <option value={6}>July</option>
                <option value={7}>August</option>
                <option value={8}>September</option>
                <option value={9}>October</option>
                <option value={10}>November</option>
                <option value={11}>December</option>
              </Select>
              <ViewTransactions transactions={monthFilteredTransactions} />
            </TabPanel>
            <TabPanel>
              <InputGroup gap={"4"}>
                <Input
                  color={"royalblue.300"}
                  type="date"
                  defaultValue={date}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    filterWeekTransactions(e.target.value, date1);
                  }}
                />
                <Input
                  color={"royalblue.300"}
                  type="date"
                  defaultValue={date1}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    filterWeekTransactions(date, e.target.value);
                  }}
                />
              </InputGroup>
              <ViewTransactions transactions={weekFilteredTransactions} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};

export default TansactionsPanel;
