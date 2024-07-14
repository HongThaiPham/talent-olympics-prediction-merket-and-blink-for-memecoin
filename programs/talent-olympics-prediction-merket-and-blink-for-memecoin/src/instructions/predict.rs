use anchor_lang::prelude::*;
use anchor_spl::token_interface::Mint;

use crate::{
    error::MyErrorCode, Prediction, PredictionDirection, DISCRIMINATOR_SIZE, PREDICTION_SEED,
};

#[derive(Accounts)]
pub struct MakePredict<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    pub mint: Box<InterfaceAccount<'info, Mint>>,
    #[account(
        init,
        payer = signer,
        seeds = [PREDICTION_SEED, mint.key().as_ref(), signer.key().as_ref()],
        bump,
        space = DISCRIMINATOR_SIZE + Prediction::INIT_SPACE,
    )]
    pub prediction: Account<'info, Prediction>,
    pub system_program: Program<'info, System>,
}

impl<'info> MakePredict<'info> {
    pub fn handler(&mut self, start_time: i64, end_time: i64, direction: u8) -> Result<()> {
        require!(
            start_time.gt(&Clock::get()?.unix_timestamp),
            MyErrorCode::InvalidTimeFrame
        );
        self.prediction.set_inner(Prediction {
            creator: self.signer.to_account_info().key(),
            mint: self.mint.to_account_info().key(),
            start_time,
            end_time,
            direction: PredictionDirection::from(direction),
        });
        Ok(())
    }
}
