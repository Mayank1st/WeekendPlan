import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { verifyEmailSchema } from '../../../validation/schemas';
import { useVerifyEmailMutation } from '../../../lib/services/auth';
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
  HStack,
  PinInput,
  PinInputField,
  Image
} from '@chakra-ui/react';

const initialValues = {
  email: "",
  otp: ""
};

const VerifyEmail = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [serverSuccessMessage, setServerSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [verifyEmail] = useVerifyEmailMutation();

  const { values, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: verifyEmailSchema,
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        const response = await verifyEmail(values);
        if (response.data && response.data.status === "success") {
          setServerSuccessMessage(response.data.message);
          setServerErrorMessage('');
          action.resetForm();
          navigate('/?message=login');
        } else if (response.error && response.error.data.status === "failed") {
          setServerErrorMessage(response.error.data.message);
          setServerSuccessMessage('');
        }
      } catch (error) {
        console.error("Verification error:", error);
        setServerErrorMessage('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Flex direction={{ base: 'column', md: 'row' }} maxW={'container.md'} w={'full'} height={'70vh'} overflow={'hidden'} borderRadius={'lg'} boxShadow={'lg'} bg={useColorModeValue('white', 'gray.700')}>
        {/* Form Section */}
        <Flex direction="column" align="center" justify="center" flex={1} p={6}>
          <Stack spacing={4} w={'full'} maxW={'sm'} bg={useColorModeValue('white', 'gray.700')} rounded={'xl'} p={6} height="100%" justifyContent="center">
            <Center>
              <Heading lineHeight={1.1} fontSize={{ base: 'xl', md: '2xl' }}>
                Verify your Email
              </Heading>
            </Center>
            {/* <Center fontSize={{ base: 'sm', sm: 'md' }} color={useColorModeValue('gray.800', 'gray.400')}>
              We have sent a code to your email
            </Center> */}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Enter your email"
                isInvalid={!!errors.email}
              />
              {errors.email && <div className="text-sm text-red-500 px-2">{errors.email}</div>}
            </FormControl>
            <FormControl>
              <FormLabel>OTP</FormLabel>
              <HStack spacing={4}>
                <PinInput
                  type="alphanumeric"
                  value={values.otp}
                  onChange={(value) => setFieldValue('otp', value)}
                  isInvalid={!!errors.otp}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
              {errors.otp && <div className="text-sm text-red-500 px-2">{errors.otp}</div>}
            </FormControl>
            <Stack spacing={6}>
              <Button
                colorScheme='blue'
                isLoading={loading}
                onClick={handleSubmit}
              >
                Verify
              </Button>
            </Stack>
            <Center>
              <p className="text-sm text-gray-600 p-1">
                Already a User? <Link to="/account/login" className="text-indigo-500 hover:text-indigo-600 transition duration-300 ease-in-out">Login</Link>
              </p>
            </Center>
            {serverSuccessMessage && <div className="text-sm text-green-500 font-semibold px-2 text-center">{serverSuccessMessage}</div>}
            {serverErrorMessage && <div className="text-sm text-red-500 font-semibold px-2 text-center">{serverErrorMessage}</div>}
          </Stack>
        </Flex>
        {/* Image Section */}
        <Flex flex={1} overflow={'hidden'}>
          <Image
            alt={'Verification Image'}
            objectFit={'cover'}
            src={'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'}
            height="100%"
            width="100%"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VerifyEmail;
