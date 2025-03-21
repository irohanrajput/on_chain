import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

async function check_balance (walletAddress: string){
    try {
        const publicKey = new PublicKey(walletAddress);
        const connection = new Connection("https://api.devnet.solana.com");

        const balanceInLamports:number = await connection.getBalance(publicKey);

        const balanceInSOL:number = balanceInLamports / LAMPORTS_PER_SOL;

        console.log(balanceInSOL);
        

    }
    catch (error){
        console.error(error.message);
    }
}


async function main() {
    console.log(`sender's balance :`);
    await check_balance("HppEDRNKQQPqcn5SHhHRaiqiZcXzeVUkLjt8LwAfVeP5");
    
    console.log(`receiver's balance :`);
    await check_balance("2omGfyaBcwoJJj1NP4aXE5jkkhit3tcowYpdc92FPjWo");
    
}

main().catch(err => console.error("Error in main:", err));