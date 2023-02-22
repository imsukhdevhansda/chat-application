import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Box,
  Input,
  Heading,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signupUser } from "../Redux/AuthReducer/reducer";

const initialField = {
  name: "",
  email: "",
  phone: "",
  password: "",
};

const Signup = () => {
  const [fieldInfo, setFieldInfo] = useState(initialField);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFieldInfo({ ...fieldInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(fieldInfo)).then((res) => {
      console.log(res);
      if (res.type === "Authentication/signupSuccess") {
        toast({
          title: "Account created.",
          description: res.payload,
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/");
      } else {
        toast({
          title: "🙁",
          description: res.payload,
          position: "top",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    });
    console.log("fieldInfo:", fieldInfo);
  };
  return (
    <Box
      boxShadow="md"
      p="6"
      rounded="md"
      bg="white"
      m={"30px auto"}
      w={"350px"}
    >
      <Heading>Signup</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Enter Name</FormLabel>
          <Input name="name" onChange={handleInputChange} type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input name="email" onChange={handleInputChange} type="email" />
        </FormControl>
        <FormControl>
          <FormLabel>Phone Number</FormLabel>
          <Input name="phone" onChange={handleInputChange} type="number" />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input name="password" onChange={handleInputChange} type="password" />
        </FormControl>
        <Button m={"10px 0"} w={"100%"} type="submit" colorScheme="blue">
          SignUp
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
