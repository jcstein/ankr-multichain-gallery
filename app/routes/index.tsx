import { Box, Heading, HStack, Link as ChakraLink } from "@chakra-ui/react";

export default function Index() {
  return (
    <Box fontFamily="system-ui, sans-serif" lineHeight={1.4}>
      <Heading as="h1" color="blue.400">
        Welcome to Remix with Chakra UI!
      </Heading>
      <HStack spacing={4}>
        <ChakraLink href="/results" rel="noreferrer">
          Ankr Multichain API - NFT Gallery
        </ChakraLink>
      </HStack>
    </Box>
  );
}
