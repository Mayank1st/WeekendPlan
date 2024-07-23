import React, { useState } from 'react';
import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Button, Heading, Text, useColorModeValue, Link } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { loginSchema } from '../../../validation/schemas';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../../lib/services/auth';

const initialValues = {
  email: "",
  password: ""
}

const Login = ({ onClose }) => {
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [serverSuccessMessage, setServerSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        const response = await loginUser(values);
        if (response.data && response.data.status === "success") {
          setServerSuccessMessage(response.data.message);
          setServerErrorMessage('');
          action.resetForm();
          setLoading(false);
          onClose();
          navigate('/user/profile');
        } else if (response.error && response.error.data.status === "failed") {
          setServerErrorMessage(response.error.data.message);
          setServerSuccessMessage('');
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    }
  });

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            {/* to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️ */}
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && <Text color="red.500" fontSize="sm">{errors.email}</Text>}
              </FormControl>
              <FormControl id="password" isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && <Text color="red.500" fontSize="sm">{errors.password}</Text>}
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'} href="/account/reset-password-link">Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{ bg: 'blue.500' }}
                  type="submit"
                  isLoading={loading}
                  disabled={loading}>
                  Sign in
                </Button>
              </Stack>
            </form>
            <Text fontSize={'sm'} color={'gray.600'}>
              Not a user? <Link color={'blue.400'} href="/account/register">Create an account</Link>
            </Text>
            {serverSuccessMessage && <Text color="green.500" fontSize="sm">{serverSuccessMessage}</Text>}
            {serverErrorMessage && <Text color="red.500" fontSize="sm">{serverErrorMessage}</Text>}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
