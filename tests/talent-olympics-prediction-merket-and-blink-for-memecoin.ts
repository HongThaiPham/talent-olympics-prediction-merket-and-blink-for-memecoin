import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TalentOlympicsPredictionMerketAndBlinkForMemecoin } from "../target/types/talent_olympics_prediction_merket_and_blink_for_memecoin";

describe("talent-olympics-prediction-merket-and-blink-for-memecoin", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TalentOlympicsPredictionMerketAndBlinkForMemecoin as Program<TalentOlympicsPredictionMerketAndBlinkForMemecoin>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
