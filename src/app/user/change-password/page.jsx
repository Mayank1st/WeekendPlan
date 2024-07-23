import { useFormik } from 'formik';
import { changePasswordSchema } from '../../../validation/schemas';
import { useChangePasswordMutation } from "../../../lib/services/auth";

import { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Flex,
  Center,
  useColorModeValue,
  Text,
  Image
} from '@chakra-ui/react';

const initialValues = {
  password: "",
  password_confirmation: ""
}

const ChangePassword = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [serverSuccessMessage, setServerSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [changePassword] = useChangePasswordMutation();

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: changePasswordSchema,
    onSubmit: async (values, action) => {
      console.log(values);
      setLoading(true);
      try {
        const response = await changePassword(values);
        if (response.data && response.data.status === "success") {
          setServerSuccessMessage(response.data.message);
          setServerErrorMessage('');
          action.resetForm();
          setLoading(false);
        }
        if (response.error && response.error.data.status === "failed") {
          setServerErrorMessage(response.error.data.message);
          setServerSuccessMessage('');
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  });

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        maxW={'container.md'}
        w={'full'}
        height={'70vh'}
        overflow={'hidden'}
        borderRadius={'lg'}
        boxShadow={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
      >
        {/* Form Section */}
        <Flex
          direction="column"
          align="center"
          justify="center"
          flex={1}
          p={6}
        >
          <Stack
            spacing={4}
            w={'full'}
            maxW={'sm'}
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            p={6}
            height="100%"
            justifyContent="center"
          >
            <Center>
              <Heading lineHeight={1.1} fontSize={{ base: 'xl', md: '2xl' }}>
                Change Password
              </Heading>
            </Center>
            <form onSubmit={handleSubmit}>
              <FormControl id="password" isInvalid={!!errors.password}>
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
              <FormControl id="password_confirmation" isInvalid={!!errors.password_confirmation} mt={4}>
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
              <Stack spacing={6} mt={4}>
                <Button
                  type="submit"
                  colorScheme='blue'
                  isLoading={loading}
                  disabled={loading}
                >
                  Change Password
                </Button>
              </Stack>
            </form>
            {serverSuccessMessage && <Text color="green.500" fontSize="sm" textAlign="center">{serverSuccessMessage}</Text>}
            {serverErrorMessage && <Text color="red.500" fontSize="sm" textAlign="center">{serverErrorMessage}</Text>}
          </Stack>
        </Flex>

        {/* Image Section */}
        <Flex flex={1} overflow={'hidden'}>
          <Image
            alt={'Change Password Image'}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
            }
            height="100%"
            width="100%"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChangePassword;
