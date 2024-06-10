import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import useShowToast from "../../hooks/useShowToast";
import { useAuth } from "@clerk/nextjs";
import {
  addDoc,
  query,
  onSnapshot,
  updateDoc,
  collection,
  where,
} from "firebase/firestore";
import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  Input,
  InputGroup,
  Center,
  Container,
  InputLeftElement,
  Radio,
  RadioGroup,
  Spacer,
  Select,
  Checkbox,
} from "@chakra-ui/react";

const AddTransaction = () => {
  const [type, setType] = useState("expense");
  const [payees, setPayees] = useState([]);
  const showToast = useShowToast();
  const { userId, isLoaded } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    id: "",
    date: new Date().toISOString().split("T")[0],
    acc: accounts[0]?.name || "",
    payee: "",
    type: "expense",
    amount: "",
    note: "",
    loan: { isLoan: false, paid: false, paidDate: "" },
    createdBy: userId,
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    if (!userId) return;
    const q = query(collection(db, "payees"), where("createdBy", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let payeesArray = [];
      querySnapshot.forEach((doc) => {
        payeesArray.push({ ...doc.data(), id: doc.id });
      });
      setPayees(payeesArray);
    });
    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    const q = query(collection(db, "accounts"),where("createdBy", "==", userId));
    const unsubscibe = onSnapshot(q, (querySnapshot) => {
      let accountsArray = [];
      querySnapshot.forEach((doc) => {
        accountsArray.push({ ...doc.data(), id: doc.id });
      });
      setAccounts(accountsArray);
      return () => unsubscibe();
    });
  }, []);

  const addTransaction = async (e) => {
    e.preventDefault();
    if (newTransaction.payee === "" || newTransaction.amount === "" || newTransaction.acc === "") {
      showToast("Error", "Please fill all the fields", "error");
    } else {
      const transactionToAdd = { ...newTransaction, type: type.toString() };
      const postDocRef = await addDoc(collection(db, "transactions"), transactionToAdd);
      await updateDoc(postDocRef, { id: postDocRef.id });
      showToast("Success", "Transaction added successfully", "success");
      resetForm();
      setType("expense");
    }
  };

  const resetForm = () => {
    setType("expense");
    setNewTransaction({
      id: "",
      date: new Date().toISOString().split("T")[0],
      acc: "Cash",
      payee: "",
      type: "expense",
      amount: "",
      note: "",
      loan: { isLoan: false, paid: false, paidDate: "" },
      createdBy: userId,
      createdAt: new Date().toISOString(),
    });
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
        <Center>
          <FormControl color={"royalblue.300"} gap={"8px"}>
            <FormLabel>New Transaction</FormLabel>
            <Stack spacing={2}>
              <Stack direction={"row"}>
                <Input
                  variant={"flushed"}
                  type="date"
                  defaultValue={newTransaction.date}
                  onChange={(e) => {
                    setNewTransaction({
                      ...newTransaction,
                      date: e.target.value,
                    });
                  }}
                />
                <Select
                  variant={"flushed"}
                  defaultValue={newTransaction.acc}
                  onChange={(e) => {
                    setNewTransaction({
                      ...newTransaction,
                      acc: e.target.value,
                    });
                  }}
                >
                  {accounts.map((account) => (
                    <option value={account.name}>{account.name}</option>
                  ))}
                </Select>
            </Stack>
            <Input
              variant={"flushed"}
              placeholder="Item/Payee"
              list="payees"
              value={newTransaction.payee}
              onChange={(e) => setNewTransaction({ ...newTransaction, payee: e.target.value })}
            />
            <datalist id="payees">
              {payees.map((payee) => (
                <option key={payee.id} value={payee.name} />
              ))}
            </datalist>
            <RadioGroup onChange={setType} value={type}>
              <Stack direction="row" spacing={"12px"}>
                <Radio size={"md"} value="expense">
                  Expense
                </Radio>
                <Radio size={"md"} value="income">
                  Income
                </Radio>
                <Radio size={"md"} value="transfer">
                  Transfer
                </Radio>
                <Checkbox
                  isChecked={newTransaction.loan.isLoan}
                  onChange={(e) => setNewTransaction({
                    ...newTransaction,
                    loan: { isLoan: e.target.checked, paid: false },
                  })}
                >
                  Is loan
                </Checkbox>
              </Stack>
            </RadioGroup>
            <InputGroup>
              <InputLeftElement pointerEvents={"none"}>₹</InputLeftElement>
              <Input
                variant={"flushed"}
                placeholder="Amount"
                type="tel"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
              />
            </InputGroup>
            <Input
              variant={"flushed"}
              placeholder="Note"
              value={newTransaction.note}
              onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
            />
          </Stack>
        </FormControl>
      </Center>
      <Stack direction={"row"} spacing={4} mt={"8px"}>
        <Spacer />
        <Button colorScheme={"royalblue"} size={"md"} onClick={addTransaction}>
          Add
        </Button>
      </Stack>
    </Container>
  );
};

export default AddTransaction;
