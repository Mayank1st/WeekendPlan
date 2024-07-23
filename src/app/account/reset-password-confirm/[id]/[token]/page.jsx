import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { resetPasswordSchema } from '../../../../../validation/schemas';
import { useResetPasswordMutation } from '../../../../../lib/services/auth';
import { Link, useNavigate } from 'react-router-dom';
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
  Image
} from '@chakra-ui/react';

const initialValues = {
  password: "",
  password_confirmation: ""
};

const ResetPasswordConfirm = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [serverSuccessMessage, setServerSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id, token } = useParams();

  const [resetPassword] = useResetPasswordMutation()
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        const data = { ...values, id, token };
        console.log(data);
        const response = await resetPassword(data);
        if (response.data && response.data.status === "success") {
          setServerSuccessMessage(response.data.message);
          setServerErrorMessage('');
          action.resetForm();
          setLoading(false);
          navigate('/account/login');
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
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              {errors.password && <div className="text-sm text-red-500 px-2">{errors.password}</div>}
            </FormControl>
            <FormControl>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                type="password"
                name="password_confirmation"
                value={values.password_confirmation}
                onChange={handleChange}
                isInvalid={!!errors.password_confirmation}
              />
              {errors.password_confirmation && <div className="text-sm text-red-500 px-2">{errors.password_confirmation}</div>}
            </FormControl>
            <Stack spacing={6}>
              <Button
                colorScheme='blue'
                isLoading={loading}
                onClick={handleSubmit}
              >
                Reset Password
              </Button>
            </Stack>
            <Center>
              <p className="text-sm text-gray-600 p-1">
                Remembered your password? <Link to="/account/login" className="text-indigo-500 hover:text-indigo-600 transition duration-300 ease-in-out">Login</Link>
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
};

export default ResetPasswordConfirm;
