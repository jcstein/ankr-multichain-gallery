import {
  VStack,
  useColorModeValue,
  Image,
  Heading,
  useClipboard,
  Button,
} from "@chakra-ui/react";

export interface CardProps {
  title?: string;
  imageSlug?: string;
  blockchain?: string;
  collection?: string;
  tokenID?: string;
  symbol?: string;
  type?: string;
  contractAddy?: string;
}
export default function Card({
  title,
  imageSlug,
  blockchain,
  collection,
  tokenID,
  symbol,
  type,
  contractAddy,
}: CardProps) {
  const value = `${contractAddy}`;
  const { hasCopied, onCopy } = useClipboard(value);
  const isImage = imageSlug?.split(".").pop() === "png";
  const isGif = imageSlug?.split(".").pop() === "gif";
  const isVideo = imageSlug?.split(".").pop() === "mp4";

  return (
    <VStack
      px={5}
      align="center"
      borderWidth="5px"
      borderRadius="2xl"
      borderColor={useColorModeValue("brand.500", "brand.500")}
      direction={{ base: "row" }}
      bg={useColorModeValue("brand.50", "brand.900")}
      padding={1}
      textAlign="center"
      textOverflow="wrap"
      noOfLines={3}
    >
      {isImage && (
        <a target="_blank" href={imageSlug} rel="noreferrer">
          <Image src={imageSlug} alt={title} boxSize="100%" rounded="xl" />
        </a>
      )}
      {isGif && (
        <a target="_blank" href={imageSlug} rel="noreferrer">
          <Image src={imageSlug} alt={title} boxSize="100%" rounded="xl" />
        </a>
      )}
      {isVideo && (
        <a target="_blank" href={imageSlug} rel="noreferrer">
          <video loop autoPlay>
            <source src={imageSlug} />
          </video>
        </a>
      )}
      {/* this is where I am rendering images/video conditionally and want to make it show correctly not only in safari, but brave/chrome as well */}
      {!isVideo && !isGif && !isImage && (
        <a target="_blank" href={imageSlug} rel="noreferrer">
          <Image
            src={imageSlug}
            alt={title}
            boxSize="100%"
            rounded="xl"
            onError={(i: any) => (i.target.style.display = "none")}
          />
          <video loop autoPlay hidden>
            <source src={imageSlug} />
          </video>
        </a>
      )}
      <VStack mb={2}>
        <Heading size="md">{title}</Heading>
        <Heading size="sm">Blockchain: {blockchain}</Heading>
        <Heading size="xs">Collection: {collection}</Heading>
        <Heading size="xs">Token ID: {tokenID}</Heading>
        <Heading size="xs">Symbol: {symbol}</Heading>
        <Heading size="xs">Type: {type}</Heading>
        <Button value={contractAddy} onClick={onCopy} size="sm">
          {hasCopied ? "Copied" : "Copy Contract Address"}
        </Button>
      </VStack>
    </VStack>
  );
}