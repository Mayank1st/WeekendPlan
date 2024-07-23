import React, { useState } from "react";
import { useFormik } from "formik";
import { changePasswordSchema } from "../../../validation/schemas";
import { useChangePasswordMutation } from "../../../lib/services/auth";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Center,
  Avatar,
  AvatarBadge,
  IconButton,
  Text
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

export default function UserProfileEdit() {
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [serverSuccessMessage, setServerSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [changePassword] = useChangePasswordMutation();

  const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      password: '',
      password_confirmation: '',
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        const response = await changePassword(values);
        if (response.data && response.data.status === "success") {
          setServerSuccessMessage(response.data.message);
          setServerErrorMessage('');
          resetForm();
        }
        if (response.error && response.error.data.status === "failed") {
          setServerErrorMessage(response.error.data.message);
          setServerSuccessMessage('');
        }
      } catch (error) {
        console.log(error);
        setServerErrorMessage('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      p={6}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
        bg={useColorModeValue("white", "gray.700")}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>

        {/* User Icon Section */}
        <FormControl id="userIcon">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>

        {/* Change Password Section */}
        <form onSubmit={handleSubmit}>
          <FormControl id="password" isInvalid={!!errors.password} mb={6}>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter your new password"
            />
            {errors.password && <Text color="red.500" fontSize="sm">{errors.password}</Text>}
          </FormControl>

          {/* Confirm Password Section */}
          <FormControl id="password_confirmation" isInvalid={!!errors.password_confirmation} mb={6}>
            <FormLabel>Confirm New Password</FormLabel>
            <Input
              type="password"
              name="password_confirmation"
              value={values.password_confirmation}
              onChange={handleChange}
              placeholder="Confirm your new password"
            />
            {errors.password_confirmation && <Text color="red.500" fontSize="sm">{errors.password_confirmation}</Text>}
          </FormControl>

          {/* Action Buttons */}
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{ bg: "red.500" }}
              onClick={() => resetForm()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{ bg: "blue.500" }}
              isLoading={loading}
              disabled={loading}
            >
              Change Password
            </Button>
          </Stack>
        </form>

        {/* Server Messages */}
        {serverSuccessMessage && <Text color="green.500">{serverSuccessMessage}</Text>}
        {serverErrorMessage && <Text color="red.500">{serverErrorMessage}</Text>}
      </Stack>
    </Flex>
  );
}
