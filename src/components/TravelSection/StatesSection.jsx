import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  SimpleGrid,
  Button,
  Link,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";
import StatesData from "./StatesData";

export default function StatsSection() {
  // State to track liked states
  const [likedStates, setLikedStates] = useState({});

  // State to track the number of rows to display
  const [rowsToShow, setRowsToShow] = useState(2);

  // Number of cards per row
  const cardsPerRow = 3;

  // Calculate the total number of cards to show based on rowsToShow
  const totalCardsToShow = rowsToShow * cardsPerRow;

  // Toggle like status
  const handleLike = (stateName) => {
    setLikedStates((prevLikedStates) => ({
      ...prevLikedStates,
      [stateName]: !prevLikedStates[stateName],
    }));
  };

  // Show more cards when the button is clicked
  const handleShowMore = () => {
    setRowsToShow((prevRows) => prevRows + 2); // Show 2 more rows
  };

  return (
    <Center py={6} flexDirection="column" height="100%">
      <Flex direction="column" flex="1" width="full">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} mb={6}>
          {StatesData.slice(0, totalCardsToShow).map((state, stateIndex) => (
            <Box
              key={stateIndex}
              w="full"
              maxW="350px"
              h="max-content"
              rounded={"sm"}
              overflow={"hidden"}
              bg="white"
              border={"1px"}
              borderColor="black"
              boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
            >
              <Box h={"200px"} borderBottom={"1px"} borderColor="black">
                <Img
                  src={state.image_url}
                  roundedTop={"sm"}
                  objectFit="cover"
                  h="full"
                  w="full"
                  alt={`${state.name} Image`}
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
                    {state.name}
                  </Text>
                </Box>
                <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
                  {state.name}
                </Heading>
                <Text color={"gray.500"} noOfLines={2}>
                  {state.districts[0].description}{" "}
                  {/* Display the description of the first district */}
                </Text>
              </Box>
              <HStack borderTop={"1px"} color="black">
                <Link
                  href={`/user/state/district/${encodeURIComponent(state.name)}`} 
                  isExternal
                  _hover={{ textDecoration: "none", color: "teal.500" }}
                  p={4}
                  display="flex"
                  alignItems="center"
                  justifyContent={"space-between"}
                  roundedBottom={"sm"}
                  cursor={"pointer"}
                >
                  <Text fontSize={"md"} fontWeight={"semibold"}>
                    View more
                  </Text>
                  <BsArrowUpRight />
                </Link>
                <Flex
                  p={4}
                  alignItems="center"
                  justifyContent={"space-between"}
                  roundedBottom={"sm"}
                  borderLeft={"1px"}
                  cursor="pointer"
                  onClick={() => handleLike(state.name)} // Toggle like on click
                >
                  {likedStates[state.name] ? (
                    <BsHeartFill fill="red" fontSize={"24px"} />
                  ) : (
                    <BsHeart fontSize={"24px"} />
                  )}
                </Flex>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
        {/* Show More Button */}
        {totalCardsToShow < StatesData.length && (
          <Center mt={6}>
            <Button colorScheme="teal" variant="outline" style={{ borderWidth: "3px" }} onClick={handleShowMore}>
              Show More
            </Button>
          </Center>
        )}
      </Flex>
    </Center>
  );
}
