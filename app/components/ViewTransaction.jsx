import { useState } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import useShowToast from "@/hooks/useShowToast";

const ViewTransaction = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = useShowToast();
  const [loan, setLoan] = useState(props.transaction.loan);
  const fullDate = new Date(props.transaction.date);
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = `${fullDate.getDate()}, ${month[fullDate.getMonth()]}`;

  const handleUpdateLoan = async (id) => {
    try {
      const updatedLoan = !loan.paid;
      if (updatedLoan) {
        await updateDoc(doc(db, "transactions", id), {
          type: "transfer",
        });
      } else {
        await updateDoc(doc(db, "transactions", id), {
          type: "expense",
        });
      }
      await updateDoc(doc(db, "transactions", id), {
        loan: {
          ...loan,
          paid: updatedLoan,
          paidDate: new Date().toISOString(),
        },
      });
      setLoan({ ...loan, paid: updatedLoan });
      showToast("Success", "Loan updated successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await deleteDoc(doc(db, "transactions", id));
      showToast("Success", "Transaction deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  let amount = `₹${props.transaction.amount}`;
  let color = "";
  if (props.transaction.type === "income") {
    amount = `+ ₹${props.transaction.amount}`;
    color = "text-green-600";
  } else if (props.transaction.type === "expense") {
    amount = `- ₹${props.transaction.amount}`;
    color = "text-red-600";
  }

  return (
    <>
      <a
        onClick={onOpen}
        className="flex bg-royalblue-900 p-3 m-1  justify-between rounded-md cursor-pointer hover:bg-royalblue-800"
      >
        <div className="flex w-24 line-clamp-1">
          {props.transaction.payee}
          {props.transaction.loan.isLoan
            ? (props.transaction.loan.paid && " ✅") || " ❗"
            : ""}
        </div>
        <div>{date}</div>
        <div className={`w-16 flex justify-end ${color}`}>{amount}</div>
      </a>

      <Modal colorScheme={"royalblue"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"royalblue.200"}>
          <ModalHeader>{props.transaction.payee}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <div>
                Amount: <span className={color}>{amount}</span>
              </div>
              <div>Acc: {props.transaction.acc}</div>
              {props.transaction.loan.isLoan && (
                <div>
                  Loan:{" "}
                  {(props.transaction.loan.paid &&
                    `Paid ✅  on: ${
                      props.transaction.loan.paidDate.split("T")[0]
                    }`) ||
                    "Pending ❗"}
                </div>
              )}
              <div>Date: {props.transaction.date}</div>
              {props.transaction.note && (
                <div>Note: {props.transaction.note}</div>
              )}
            </Stack>
          </ModalBody>

          <ModalFooter>
            {loan.isLoan &&
              ((loan.paid && (
                <Button
                  colorScheme="royalblue"
                  mr={3}
                  onClick={() => handleUpdateLoan(props.transaction.id)}
                >
                  Unpaid
                </Button>
              )) || (
                <Button
                  colorScheme="royalblue"
                  mr={3}
                  onClick={() => handleUpdateLoan(props.transaction.id)}
                >
                  Paid
                </Button>
              ))}
            <Button
              colorScheme={"royalblue"}
              onClick={() => deleteTransaction(props.transaction.id)}
              variant="ghost"
            >
              Delete Transaction
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewTransaction;
