use anchor_lang::prelude::*;

#[error_code]
pub enum MyErrorCode {
    #[msg("Invalid time frame")]
    InvalidTimeFrame,
}
