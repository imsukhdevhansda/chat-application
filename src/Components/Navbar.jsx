import React from "react";
import { Flex, Spacer, Text, Heading } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../Redux/AuthReducer/reducer";

const Navbar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((store) => store.auth);
  const handleLogOut = () => {
    dispatch(logOutUser());
  };
  return (
    <nav>
      <Flex p={"0 10px"} alignItems={"center"} h={"50px"} bg={"blue.500"}>
        <Heading size={"md"} color={"white"}>
          Chat-App
        </Heading>
        <Spacer />

        {name ? (
          <>
            <Text color="white" m={"5px"}>
              {name}
            </Text>
            <NavLink to={"/chat"}>
              <Text color={"white"} m={"5px"}>
                Chat
              </Text>
            </NavLink>
            <Text
              onClick={handleLogOut}
              cursor={"pointer"}
              color="white"
              m={"5px"}
            >
              LogOut
            </Text>
          </>
        ) : (
          <>
            <NavLink to={"/"}>
              <Text color={"white"} m={"5px"}>
                Login
              </Text>
            </NavLink>
            <NavLink to={"/signup"}>
              <Text color={"white"} m={"5px"}>
                Signup
              </Text>
            </NavLink>
          </>
        )}
      </Flex>
    </nav>
  );
};

export default Navbar;
