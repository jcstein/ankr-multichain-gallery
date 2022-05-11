import { useLoaderData } from "@remix-run/react";
import Card from "../components/Card";
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  Heading,
  Container,
  SimpleGrid,
  Text,
  Input,
  Button,
  useClipboard,
} from "@chakra-ui/react";
import theme from "../theme";
import Fonts from "../Fonts";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Logo } from "../Logo";

const url = "https://rpc.ankr.com/multichain";

const body = {
  jsonrpc: "2.0",
  method: "ankr_getNFTsByOwner",
  params: {
    // blockchain: "eth",
    walletAddress: "0x186Ea56F0a40c5593A697B3E804968b8C5920Ff3",
    pageSize: 50, // this may be too large of a request. pageToken is returned at end of json, so would like to add pagination as well
    pageToken: "",
  },
  id: 1,
};

export const loader = async () => {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data.result;
};

export default function Results() {
  const { owner, assets } = useLoaderData(); // data.result ----> {owner: somestring, assets: [nft]}
  const value = `${owner}`;
  const { hasCopied, onCopy } = useClipboard(value);
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Container p={5} maxW="9xl">
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={8}>
              <Logo h="20vmin" pointerEvents="none" />
              <Heading
                fontSize={{ base: "lg", sm: "2xl", md: "4xl", lg: "5xl" }}
              >
                Ankr Multichain API NFT Gallery
              </Heading>
              {/* add input to body request here or add connect wallet with rainbowkit*/}
              <Text fontSize="sm">
                gm, enter your Ethereum Wallet Address to display your NFTs
              </Text>
              <Input placeholder={owner} />
              <Button size="md">Display my NFTs</Button>
              <Button value={owner} onClick={onCopy} size="sm">
                {hasCopied ? "Copied" : "Copy Wallet Address"}
              </Button>
              {/* fix truncation of text to keep app responsive */}
              {/* <Text isTruncated>gm, {owner}</Text> */}
              <SimpleGrid
                minChildWidth="300px"
                spacing={{
                  base: "15px",
                  sm: "15px",
                  md: "15px",
                }}
                p={3}
                alignItems="flex-start"
              >
                {assets.map((nft: any) => (
                  <div key={nft.tokenId}>
                    <Card
                      key={nft.tokenId}
                      title={
                        nft.name
                          ? nft.name
                          : "name not found - can the devs do something? 😆"
                      }
                      imageSlug={
                        nft.imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/")
                          ? nft.imageUrl.replace(
                              "ipfs://",
                              "https://ipfs.io/ipfs/"
                            )
                          : "https://raw.githubusercontent.com/jcstein/jpegs/main/image-not-found-01.png"
                      }
                      blockchain={nft.blockchain}
                      collection={
                        nft.collectionName
                          ? nft.collectionName
                          : "collectionName not found"
                      }
                      tokenID={nft.tokenId}
                      symbol={nft.symbol}
                      type={nft.contractType}
                      contractAddy={nft.contractAddress}
                    />
                  </div>
                ))}
              </SimpleGrid>
            </VStack>
          </Grid>
        </Box>
      </Container>
    </ChakraProvider>
  );
}
