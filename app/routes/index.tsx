// Imports
// ========================================================
import React, { useEffect, useState } from "react";
import { useSearchParams } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import Card from "../components/Card";
import {
  FormLabel,
  Input,
  Box,
  VStack,
  HStack,
  Grid,
  Heading,
  Container,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { FaEthereum } from "react-icons/fa";
import { GiMagnifyingGlass } from "react-icons/gi";
import Fonts from "../components/Fonts";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { Logo } from "../components/Logo";

// Profile Component
// ========================================================
function Profile() {
  const { data } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address: data?.address });

  if (data)
    return (
      <VStack>
        <Button leftIcon={<FaEthereum />} p={3} disabled>
          Connected to {ensName ?? data.address}
        </Button>
        <HStack>
          <Button onClick={() => disconnect()}>Disconnect</Button>
          <Button
            leftIcon={<GiMagnifyingGlass />}
            onClick={() =>
              (window.location.href = `/?walletAddress=${data?.address}`)
            }
          >
            Check My NFTs
          </Button>
        </HStack>
      </VStack>
    );
  return (
    <Button leftIcon={<FaEthereum />} onClick={() => connect()}>
      Connect Wallet
    </Button>
  );
}

// Requests
// ========================================================
/**
 *
 * @param param0
 */
export const fetchNFTsByOwner = async ({
  walletAddress,
  pageSize = 45,
  pageToken = "",
}: {
  walletAddress: string;
  pageSize?: number;
  pageToken?: string;
}) => {
  const res = await fetch("https://rpc.ankr.com/multichain", {
    method: "POST",
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "ankr_getNFTsByOwner",
      params: {
        // blockchain: "eth", // "eth" "bsc" "fantom" "avalanche" "polygon" "arbitrum" or combination of chains ["eth", "polygon"]
        walletAddress,
        pageSize,
        pageToken,
      },
      id: 1,
    }),
  });
  const data = await res.json();
  return data;
};

// Main Remix Loader
// ========================================================
/**
 *
 * @param args
 * @returns
 */
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const wallet = url.searchParams.get("walletAddress");
  if (!wallet) return null;

  const data = await fetchNFTsByOwner({
    walletAddress: wallet ?? "",
  });
  return data?.result ?? null;
};

// Main Route Component
// ========================================================
/**
 *
 * @returns
 */
export default function Index() {
  // State / Props
  const { data: accountData } = useAccount();
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(() => {
    return searchParams.get("walletAddress") ?? "";
  });
  const loader = useLoaderData();

  // Functions
  /**
   *
   * @param event
   */
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   *
   * @param url
   */
  // const isSupportedAsset = (url: string) => {
  //   return ["png", "jpg", "jpeg", "gif", "mp4"].includes(url);
  // };

  // Hooks
  useEffect(() => {
    if (!accountData?.address) return;
    setInputValue(accountData?.address);
  }, [accountData?.address]);

  // Render / UI
  return (
    <div>
      <Fonts />
      <Container p={5} maxW="9xl">
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={8}>
              <a href="/">
                <Logo h="20vmin" pointerEvents="none" />
              </a>
              <Heading
                fontSize={{ base: "lg", sm: "2xl", md: "4xl", lg: "5xl" }}
              >
                Ankr Multichain API NFT Gallery
              </Heading>
              <Text fontSize="md">
                gm, sign in with your Ethereum Wallet or enter your address
                below to display your NFTs
              </Text>
              <Profile />
              <form method="get" action={`/`}>
                <FormLabel
                  display="block"
                  textAlign="center"
                  htmlFor="walletAddress"
                  margin="0 0 6px 0"
                >
                  Wallet Address
                </FormLabel>
                <Input
                  placeholder="Ex: 0x1234"
                  margin="0 0 10px 0"
                  id="walletAddress"
                  name="walletAddress"
                  textAlign="center"
                  onChange={onChangeInput}
                  value={inputValue}
                />
                <Button
                  leftIcon={<GiMagnifyingGlass />}
                  type="submit"
                  display="block"
                  width="100%"
                >
                  Look Up
                </Button>
              </form>
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
                {loader?.assets.map((nft: any, key: number) => (
                  <div key={`nft-${key}`}>
                    <Card
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
                      // imageSlug={
                      //   nft.imageUrl.replace(
                      //     "ipfs://",
                      //     "https://ipfs.io/ipfs/"
                      //   ) && isSupportedAsset(nft.imageUrl.slice(-3).toLowerCase()) // verify image by getting extension
                      //     ? nft.imageUrl.replace(
                      //       "ipfs://",
                      //       "https://ipfs.io/ipfs/"
                      //     )
                      //     : "https://raw.githubusercontent.com/jcstein/jpegs/main/image-not-found-01.png"
                      // }
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
    </div>
  );
}
