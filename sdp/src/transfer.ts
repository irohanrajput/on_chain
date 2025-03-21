

import { Connection, Transaction, SystemProgram, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import "dotenv/config";

import { getKeypairFromEnvironment } from "@solana-developers/helpers";

//sample
// sender's public key: HppEDRNKQQPqcn5SHhHRaiqiZcXzeVUkLjt8LwAfVeP5    
// receiver's public key: 2omGfyaBcwoJJj1NP4aXE5jkkhit3tcowYpdc92FPjWo


async function transferSOL() {
    try {
        const suppliedToPubKey = process.argv[2] || null;

        if (!suppliedToPubKey) {
            console.log(`Please provide receiver's public key like this: npx esrun transfer.ts <receiver's public key>`);
            process.exit(1);
        }

        const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

        const toPublicKey = new PublicKey(suppliedToPubKey);

        const connection = new Connection("https://api.devnet.solana.com", "confirmed");

        const transaction = new Transaction();

        const lamportsToSend = 5;

        const sendSolInstruction = SystemProgram.transfer({
            fromPubkey: senderKeypair.publicKey,
            toPubkey: toPublicKey, lamports: lamportsToSend
        })

        transaction.add(sendSolInstruction);

        const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);

        console.log(
            `💸 Finished! Sent ${lamportsToSend} to the address ${toPublicKey}. `,
        );
        console.log(`Transaction signature is ${signature}!`);
    }
    catch (error) {
        console.error(error.message);
    }
}

async function main() {
    await transferSOL();
}

main()