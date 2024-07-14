import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TalentOlympicsPredictionMerketAndBlinkForMemecoin } from "../target/types/talent_olympics_prediction_merket_and_blink_for_memecoin";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import dayjs from "dayjs";
import { assert } from "chai";

describe("talent-olympics-prediction-merket-and-blink-for-memecoin", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace
    .TalentOlympicsPredictionMerketAndBlinkForMemecoin as Program<TalentOlympicsPredictionMerketAndBlinkForMemecoin>;

  const TOKEN_DECIMALS = 9;
  const TOKEN_INIT_AMOUNT = 1_000_000 * 10 ** TOKEN_DECIMALS;

  const [creator, user] = [
    anchor.web3.Keypair.generate(),
    anchor.web3.Keypair.generate(),
  ];

  console.table({
    creator: creator.publicKey.toBase58(),
  });

  const memeTokenKeypair = anchor.web3.Keypair.generate();

  const [predictionAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("prediction"),
      memeTokenKeypair.publicKey.toBuffer(),
      creator.publicKey.toBuffer(),
    ],
    program.programId
  );

  before(async () => {
    {
      const tx = await provider.connection.requestAirdrop(
        creator.publicKey,
        5 * anchor.web3.LAMPORTS_PER_SOL
      );
      await provider.connection.confirmTransaction(tx);
      const tx2 = await provider.connection.requestAirdrop(
        user.publicKey,
        5 * anchor.web3.LAMPORTS_PER_SOL
      );
      await provider.connection.confirmTransaction(tx2);
    }
    {
      // init token for test to poolAuthor
      const mint = await createMint(
        provider.connection,
        creator,
        creator.publicKey,
        null,
        TOKEN_DECIMALS,
        memeTokenKeypair
      );

      const creatorTokenAccount = await getOrCreateAssociatedTokenAccount(
        provider.connection,
        creator,
        mint,
        creator.publicKey
      );

      await mintTo(
        provider.connection,
        creator,
        mint,
        creatorTokenAccount.address,
        creator,
        BigInt(TOKEN_INIT_AMOUNT)
      );
    }
  });

  it("should create a new prediction market failt because predict in past", async () => {
    const startTime = new anchor.BN(dayjs().subtract(5, "s").unix());
    const endTime = new anchor.BN(dayjs().add(30, "s").unix());

    try {
      await program.methods
        .makePredict(startTime, endTime, 1)
        .accountsPartial({
          signer: creator.publicKey,
          mint: memeTokenKeypair.publicKey,
          prediction: predictionAccount,
        })
        .signers([creator])
        .rpc();

      assert.ok(false);
    } catch (error) {
      assert.isNotNull(error);
    }
  });

  it("should create a new prediction market successfully", async () => {
    const startTime = new anchor.BN(dayjs().add(5, "s").unix());
    const endTime = new anchor.BN(dayjs().add(35, "s").unix());

    const tx = await program.methods
      .makePredict(startTime, endTime, 1)
      .accountsPartial({
        signer: creator.publicKey,
        mint: memeTokenKeypair.publicKey,
        prediction: predictionAccount,
      })
      .signers([creator])
      .rpc();

    assert.ok(tx);

    const prediction = await program.account.prediction.fetch(
      predictionAccount
    );

    assert.equal(prediction.startTime.toNumber(), startTime.toNumber());
    assert.equal(prediction.endTime.toNumber(), endTime.toNumber());
    assert.equal(prediction.creator.toBase58(), creator.publicKey.toBase58());
    assert.equal(
      prediction.mint.toBase58(),
      memeTokenKeypair.publicKey.toBase58()
    );
    assert.isNotNull(prediction.direction.higher);

    console.log("make predict tx", tx);
  });

  it("should check prediction result successfully", async () => {
    const startTime = new anchor.BN(dayjs().add(5, "s").unix());
    const endTime = new anchor.BN(dayjs().add(35, "s").unix());
    const [userpredictionAccount] =
      anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("prediction"),
          memeTokenKeypair.publicKey.toBuffer(),
          user.publicKey.toBuffer(),
        ],
        program.programId
      );
    await program.methods
      .makePredict(startTime, endTime, 1)
      .accountsPartial({
        signer: user.publicKey,
        mint: memeTokenKeypair.publicKey,
        prediction: userpredictionAccount,
      })
      .signers([user])
      .rpc();

    const tx = await program.methods
      .checkResult()
      .accountsPartial({
        signer: user.publicKey,
        mint: memeTokenKeypair.publicKey,
        prediction: userpredictionAccount,
      })
      .signers([user])
      .rpc();

    assert.ok(tx);

    console.log("check result tx", tx);
  });

  it("should close prediction market successfully", async () => {
    const tx = await program.methods
      .closePrediction()
      .accountsPartial({
        signer: creator.publicKey,
        mint: memeTokenKeypair.publicKey,
        prediction: predictionAccount,
      })
      .signers([creator])
      .rpc();

    assert.ok(tx);

    console.log("close predict tx", tx);
  });
});
