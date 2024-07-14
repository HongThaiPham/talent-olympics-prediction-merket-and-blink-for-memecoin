use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Prediction {
    pub creator: Pubkey,
    pub mint: Pubkey,
    pub start_time: i64,
    pub end_time: i64,
    pub direction: PredictionDirection,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, InitSpace)]
pub enum PredictionDirection {
    Higher,
    Lower,
}

impl From<u8> for PredictionDirection {
    fn from(val: u8) -> Self {
        match val {
            0 => PredictionDirection::Lower,
            1 => PredictionDirection::Higher,
            _ => panic!("Invalid CurrencyType"),
        }
    }
}
