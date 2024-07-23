import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Img, SimpleGrid, Center, Button, useToast } from '@chakra-ui/react';
import { BsArrowUpRight } from 'react-icons/bs';
import StatesData from '../TravelSection/StatesData';
import { useGetUserQuery } from '../../lib/services/auth';
import { useState } from 'react';

const DistrictSection = () => {
  const { stateName } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // Check if the user is logged in
  const { data: user, isLoading, isError } = useGetUserQuery();

  // Find the selected state
  const state = StatesData.find(s => s.name === stateName);

  if (!state) {
    return <Text>State not found</Text>;
  }

  const handleViewMore = (district) => {
    if (isLoading) return; // Avoid navigation if still loading
    if (user) {
      console.log(state.name)

      navigate(`/user/profile`, {
        state: {
          selectedDistrict: district,
          stateName: state.name // Pass the state name as well
        }
      });
    } else {
      toast({
        title: "User is logged out",
        description: "Please login first",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  

  return (
    <Center py={6} flexDirection="column" width="full">
      <Heading mb={6}>{state.name}</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {state.districts.map((district, index) => (
          <Box
            key={index}
            w="full"
            maxW="350px"
            h="max-content"
            rounded={"sm"}
            overflow={"hidden"}
            bg="white"
            border={"1px"}
            borderColor="black"
            boxShadow="6px 6px 0 black"
          >
            <Box h={"200px"} borderBottom={"1px"} borderColor="black">
              <Img
                src={district.image_url}
                roundedTop={"sm"}
                objectFit="cover"
                h="full"
                w="full"
                alt={`${district.name} Image`}
              />
            </Box>
            <Box p={4}>
              <Box
                bg="black"
                display={"inline-block"}
                px={2}
                py={1}
                color="white"
                mb={2}
              >
                <Text fontSize={"xs"} fontWeight="medium">
                  {district.name}
                </Text>
              </Box>
              <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
                {district.name}
              </Heading>
              <Text color={"gray.500"} noOfLines={2}>
                {district.description}
              </Text>
            </Box>
            <Box borderTop={"1px"} borderColor="black">
              <Button
                onClick={() => handleViewMore(district)}
                colorScheme="teal"
                variant="link"
                p={4}
                display="flex"
                alignItems="center"
                justifyContent={"space-between"}
                roundedBottom={"sm"}
              >
                <Text fontSize={"md"} fontWeight={"semibold"}>
                  View more
                </Text>
                <BsArrowUpRight />
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Center>
  );
};

export default DistrictSection;
