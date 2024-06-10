"use client";
import { useState } from "react";
import useShowToast from "@/hooks/useShowToast";
import { db } from "@/app/firebase/config";
import { addDoc, updateDoc, collection } from "firebase/firestore";
import { Button, Container, FormControl, Input, Stack } from "@chakra-ui/react";
import { useAuth } from "@clerk/nextjs";

const AddAccount = () => {
  const { userId, isLoaded } = useAuth();
  const [account, setAccount] = useState({ id: "", name: "", createdBy: userId});
  const showToast = useShowToast();
  const addAccount = async (e) => {
    e.preventDefault();
    try {
      if (!isLoaded || !userId){
        throw new Error("User not authenticated");
      }
      const docRef = await addDoc(collection(db, "accounts"), account);
      await updateDoc(docRef, { id: docRef.id });
      console.log(account);
      showToast("Success", "Account added successfully", "success");
      setAccount({ id: "", name: "",createdBy: userId });
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
              placeholder="Account Name"
              value={account.name}
              onChange={(e) => setAccount({ ...account, name: e.target.value })}
            />
            <Button onClick={(e) => addAccount(e)}>Add Account</Button>
          </Stack>
        </FormControl>
      </Container>
    </>
  );
};

export default AddAccount;
