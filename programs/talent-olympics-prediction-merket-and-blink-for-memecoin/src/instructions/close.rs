use anchor_lang::prelude::*;
use anchor_spl::token_interface::Mint;

use crate::{Prediction, PREDICTION_SEED};

#[derive(Accounts)]
pub struct ClosePrediction<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    pub mint: Box<InterfaceAccount<'info, Mint>>,
    #[account(
        mut,
        seeds = [PREDICTION_SEED, mint.key().as_ref(), signer.key().as_ref()],
        bump,
        close = signer,
        has_one = mint,
    )]
    pub prediction: Account<'info, Prediction>,
    pub system_program: Program<'info, System>,
}

impl<'info> ClosePrediction<'info> {
    pub fn handler(&mut self) -> Result<()> {
        msg!("Close prediction");
        Ok(())
    }
}
