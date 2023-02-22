import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newMessage, saveAllUser } from "../Redux/ChatReducer/reducer";
import { Stack, Flex, Box, Text, Input, Button } from "@chakra-ui/react";
import socketIO from "socket.io-client";
const socket = socketIO.connect(process.env.REACT_APP_API);

const Chat = () => {
  const messageBox = useRef(null);
  const userBox = useRef(null);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const {
    chat: { allUser, allMessage },
    auth: { name },
  } = useSelector((store) => store);
  const handleChat = (e) => {
    e.preventDefault();
    const payload = {
      message,
      user: name,
    };
    socket.emit("message", payload);
    dispatch(newMessage(payload));
    setMessage("");
  };

  useEffect(() => {
    socket.emit("join", name);
  }, []);

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      if (data.user !== name) {
        dispatch(newMessage(data));
      }
    });
    socket.on("join", (data) => {
      // checking logged in and current user
      if (data !== name) {
        dispatch(saveAllUser(data));
      }
    });
  }, [socket]);

  useEffect(() => {
    messageBox.current.scroll({
      top: messageBox.current.scrollHeight,
      behavior: "smooth",
    });

    userBox.current.scroll({
      top: messageBox.current.scrollHeight,
      behavior: "smooth",
    });
  }, [allMessage, allUser]);

  return (
    <div>
      <Flex direction={"row"}>
        <Box w={"275px"}>
          <Text fontWeight={"bold"}>Users</Text>
          <Stack
            ref={userBox}
            h={"88vh"}
            p={"5px"}
            className="scroll_bar"
            overflowY={"scroll"}
          >
            {allUser.map((user, id) => {
              return (
                <Box
                  key={id}
                  cursor={"pointer"}
                  h={"34px"}
                  bg={"#16A085"}
                  color="white"
                  p="5px"
                  borderRadius="7px"
                >
                  {user}
                </Box>
              );
            })}
          </Stack>
        </Box>
        {/* All messages inside the box */}
        <Box p={"0 15px"} w={"100%"}>
          <Box ref={messageBox} overflow={"auto"} height={"85vh"} p={"10px 0"}>
            {allMessage.map((message, id) => {
              return (
                <Stack
                  key={id}
                  alignItems={message.user === name ? "flex-end" : "flex-start"}
                >
                  <Text fontSize={"xs"} color="grey" textAlign={"left"}>
                    {message.user}
                  </Text>
                  <Text
                    backgroundColor={
                      message.user === name ? "#067940" : "#507c7c"
                    }
                    color="white"
                    w={"-webkit-fit-content"}
                    borderRadius={
                      message.user === name
                        ? "20px 0px 20px 0px"
                        : "0px 20px 0px 20px"
                    }
                    p={"6px 15px"}
                    textAlign={"left"}
                    fontSize="md"
                  >
                    {message.message}
                  </Text>
                </Stack>
              );
            })}
          </Box>
          {/* Send message box */}
          <Stack left={0} width={"100%"} bottom={2}>
            <form onSubmit={handleChat}>
              <Stack direction={"row"}>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  placeholder="Enter Message"
                />
                <Button type="submit" colorScheme="teal">
                  Send
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Flex>
    </div>
  );
};

export default Chat;
