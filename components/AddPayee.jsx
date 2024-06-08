"use client";
import { useState } from "react";
import useShowToast from "@/hooks/useShowToast";
import { db } from "@/app/firebase/config";
import { addDoc, updateDoc, collection } from "firebase/firestore";
import { Button, Container, FormControl, Input, Stack } from "@chakra-ui/react";

const AddPayee = () => {
  const [payee, setPayee] = useState({ id: "", name: "", createdBy: ""});
  const showToast = useShowToast();
  const addPayee = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "payees"), payee);
      await updateDoc(docRef, { id: docRef.id });
      console.log(payee);
      showToast("Success", "Payee added successfully", "success");
      setPayee({ id: "", name: "" });
    } catch (e) {
      showToast("Error", e.message, "error");
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
        <FormControl color={"royalblue.300"} gap={"8px"}>
          <Stack spacing={2}>
            <Input
              placeholder="Payee Name"
              value={payee.name}
              onChange={(e) => setPayee({ ...payee, name: e.target.value })}
            />
            <Button onClick={(e) => addPayee(e)}>Add Payee</Button>
          </Stack>
        </FormControl>
      </Container>
    </>
  );
};

export default AddPayee;
