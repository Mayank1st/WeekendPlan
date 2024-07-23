import { useState } from "react";
import {
  chakra,
  Box,
  Stack,
  Text,
  Image,
  Container,
  Button,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import EventForm from "./EventForm";

const Index = () => {
  const location = useLocation();
  const { selectedDistrict, stateName } = location.state || {};
  const [isFormVisible, setIsFormVisible] = useState(false); // State to handle form visibility

  if (!selectedDistrict) {
    return <Text>No district selected</Text>;
  }

  const handleAccessNowClick = () => {
    setIsFormVisible(true); // Show the form when the button is clicked
  };

  return (
    <Container p={{ base: 5, md: 10 }}>
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "start", md: "center" }}
        gap={{ base: 4, md: 10 }} // 10px gap for larger screens
        wrap="wrap"
      >
        <Box
          borderWidth="1px"
          _hover={{ shadow: "lg" }}
          rounded="md"
          overflow="hidden"
          bg={useColorModeValue("white", "gray.800")}
          w={{ base: "full", sm: "80%" }}
          maxW="500px"
          h="auto"
        >
          <Image
            src={selectedDistrict.image_url}
            objectFit="cover"
            w="100%"
            h="200px"
            alt={`Image of ${selectedDistrict.name}`}
          />
          <Box p={{ base: 3, sm: 5 }}>
            <Box mb={6}>
              <chakra.h3
                fontSize={{ base: "lg", sm: "2xl" }}
                fontWeight="bold"
                lineHeight="1.2"
                mb={2}
              >
                {stateName} - {selectedDistrict.name}
              </chakra.h3>
              <Text fontSize={{ base: "md", sm: "lg" }} noOfLines={2}>
                {selectedDistrict.description}
              </Text>
            </Box>
            <Stack
              justifyContent="space-between"
              direction={{ base: "column", sm: "row" }}
              spacing={{ base: 2, sm: 0 }}
            >
              {/* <CustomButton
                colorScheme="teal"
                variant="solid"
                onClick={handleAccessNowClick}
              >
                Access Now
              </CustomButton> */}
            </Stack>
          </Box>
        </Box>

        {isFormVisible && (
            <EventForm district={selectedDistrict} />
        )}
      </Flex>
    </Container>
  );
};

const CustomButton = ({ children, ...props }) => {
  return (
    <Button
      textTransform="uppercase"
      lineHeight="inherit"
      rounded="md"
      {...props}
    >
      {children}
    </Button>
  );
};

export default Index;
