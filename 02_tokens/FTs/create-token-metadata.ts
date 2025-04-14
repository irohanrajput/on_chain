import { getExplorerLink } from "@solana-developers/helpers";

import { Connection, clusterApiUrl, Keypair, PublicKey, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";

import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../dev-wallet.json"

const connection = new Connection(clusterApiUrl("devnet"));

const user = Keypair.fromSecretKey(new Uint8Array(wallet));

const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");


const tokenMintAccount = new PublicKey("BJ2odwUZp2ZB9NiMRikojttRQXhdchArA7AbeYLk9EKt");



(async () => {
    try {
        const metadataData = {
            name: "Solana Training Token",
            symbol: "TRAINING",
            // Arweave / IPFS / Pinata etc link using metaplex standard for offchain data
            uri: "https://arweave.net/1234",
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
          };
          
          const metadataPDAAndBump = PublicKey.findProgramAddressSync(
            [
              Buffer.from("metadata"),
              TOKEN_METADATA_PROGRAM_ID.toBuffer(),
              tokenMintAccount.toBuffer(),
            ],
            TOKEN_METADATA_PROGRAM_ID,
          );
          
          const metadataPDA = metadataPDAAndBump[0];
          
          const transaction = new Transaction();
          
          const createMetadataAccountInstruction =
            createCreateMetadataAccountV3Instruction(
              {
                metadata: metadataPDA,
                mint: tokenMintAccount,
                mintAuthority: user.publicKey,
                payer: user.publicKey,
                updateAuthority: user.publicKey,
              },
              {
                createMetadataAccountArgsV3: {
                  collectionDetails: null,
                  data: metadataData,
                  isMutable: true,
                },
              },
            );
          
          transaction.add(createMetadataAccountInstruction);
          
          const transactionSignature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [user],
          );
          
          const transactionLink = getExplorerLink(
            "transaction",
            transactionSignature,
            "devnet",
          );
          
          console.log(`✅ Transaction confirmed, explorer link is: ${transactionLink}`);
          
          const tokenMintLink = getExplorerLink(
            "address",
            tokenMintAccount.toString(),
            "devnet",
          );
          
          console.log(`✅ Look at the token mint again: ${tokenMintLink}`);

    } catch (error) {
        console.error(error)
    }

})();