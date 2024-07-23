import { useFormik } from 'formik';
import { resetPasswordLinkSchema } from '../../../validation/schemas';
import { Link, useNavigate } from 'react-router-dom';
import { useResetPasswordLinkMutation } from '../../../lib/services/auth';

import { useState } from "react";
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
  Image
} from '@chakra-ui/react';

const initialValues = {
  email: "",
};

const ResetPasswordLink = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [serverSuccessMessage, setServerSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetPasswordLink] = useResetPasswordLinkMutation()
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: resetPasswordLinkSchema,
    onSubmit: async (values, action) => {
      console.log(values);
      setLoading(true);
      try {
        const response = await resetPasswordLink(values);
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
        setLoading(false);
      }
    }
  });

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        maxW={'container.md'} // Adjusted for smaller size
        w={'full'}
        height={'70vh'} // Adjusted for smaller size
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
                Reset Password
              </Heading>
            </Center>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              {errors.email && <div className="text-sm text-red-500 px-2">{errors.email}</div>}
            </FormControl>
            <Stack spacing={6}>
              <Button
                colorScheme='blue'
                isLoading={loading}
                onClick={handleSubmit}
              >
                {loading ? "Sending email...." : "Send"}
              </Button>
            </Stack>
            <Center>
              <p className="text-sm text-gray-600 p-1">
                Not a User? <Link to="/account/register" className="text-indigo-500 hover:text-indigo-600 transition duration-300 ease-in-out">Create an account</Link>
              </p>
            </Center>
            {serverSuccessMessage && <div className="text-sm text-green-500 font-semibold px-2 text-center">{serverSuccessMessage}</div>}
            {serverErrorMessage && <div className="text-sm text-red-500 font-semibold px-2 text-center">{serverErrorMessage}</div>}
          </Stack>
        </Flex>

        {/* Image Section */}
        <Flex flex={1} overflow={'hidden'}>
          <Image
            alt={'Reset Password Image'}
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
}

export default ResetPasswordLink;
