import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Box,
  Input,
  Heading,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../Redux/AuthReducer/reducer";

const initialField = {
  email: "datta@gmail.com",
  password: "12345",
};

const Login = () => {
  const [fieldInfo, setFieldInfo] = useState(initialField);
  const navigate = useNavigate();
  // const store = useSelector((store) => console.log(store));
  const toast = useToast();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFieldInfo({ ...fieldInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(fieldInfo)).then((res) => {
      if (res.type === "Authentication/loginSuccess") {
        toast({
          title: "Success",
          description: res.payload.res,
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/chat");
      } else {
        toast({
          title: "😯",
          description: res.payload,
          position: "top",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    });

    // console.log("fieldInfo:", fieldInfo);
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
      <Heading>Login</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            // value={initialField.email}
            name="email"
            onChange={handleInputChange}
            type="email"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            // value={initialField.password}
            name="password"
            onChange={handleInputChange}
            type="password"
          />
        </FormControl>
        <Button m={"10px 0"} w={"100%"} type="submit" colorScheme="blue">
          SignIn
        </Button>
      </form>
    </Box>
  );
};

export default Login;
