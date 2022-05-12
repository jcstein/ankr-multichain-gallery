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
  Button,
} from "@chakra-ui/react";
import theme from "../theme";
import Fonts from "../components/Fonts";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { Logo } from "../components/Logo";
import { Provider, createClient } from "wagmi";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { FaEthereum } from "react-icons/fa";

function Profile() {
  const { data } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (data)
    return (
      <VStack>
        <Button leftIcon={<FaEthereum />} p={3} disabled>
          Connected to {data.address}
        </Button>
        <Button onClick={() => disconnect()}>Disconnect</Button>
      </VStack>
    );
  return (
    <Button leftIcon={<FaEthereum />} onClick={() => connect()}>
      Connect Wallet
    </Button>
  );
}

const client = createClient();

const url = "https://rpc.ankr.com/multichain";

const body = {
  jsonrpc: "2.0",
  method: "ankr_getNFTsByOwner",
  params: {
    // blockchain: "eth", // "eth" "bsc" "fantom" "avalanche" "polygon" "arbitrum" or combination of chains ["eth", "polygon"]
    walletAddress: "0x186Ea56F0a40c5593A697B3E804968b8C5920Ff3",
    pageSize: 15,
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

export default function Index() {
  const { assets } = useLoaderData(); // data.result ----> {owner: somestring, assets: [nft]}
  return (
    <Provider client={client}>
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
                <Text fontSize="sm">
                  gm, sign in with your Ethereum Wallet Address to display your
                  NFTs
                </Text>
                <Profile />
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
                  {assets.map((nft: any, key: number) => (
                    <div key={`nft-${key}`}>
                      <Card
                        title={
                          nft.name
                            ? nft.name
                            : "name not found - can the devs do something? 😆"
                        }
                        imageSlug={
                          nft.imageUrl.replace(
                            "ipfs://",
                            "https://ipfs.io/ipfs/"
                          )
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
    </Provider>
  );
}
