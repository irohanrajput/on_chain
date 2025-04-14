import { createMint } from "@solana/spl-token";

import { getExplorerLink } from "@solana-developers/helpers";

import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";


import wallet from "../dev-wallet.json"

const conn = new Connection(clusterApiUrl("devnet"));

const user = Keypair.fromSecretKey(new Uint8Array(wallet));


(async () => {
    const tokenMint = await createMint(
        conn,
        user,
        user.publicKey,
        null,
        2
    )

    const link = getExplorerLink("address", tokenMint.toString(), "devnet")

    console.log(`✅ Finished! Created token mint: ${link}`);

})();