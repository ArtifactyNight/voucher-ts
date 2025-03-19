export interface TrueWalletVoucherResponse {
  status: {
    code: TrueWalletStatusCode;
    message: string;
  };
  data?: {
    voucher: {
      redeemed_amount_baht: string;
      value_amount_baht: string;
    };
  };
}

export type TrueWalletStatusCode =
  | "SUCCESS"
  | "TARGET_USER_REDEEMED"
  | "INTERNAL_ERROR"
  | "CANNOT_GET_OWN_VOUCHER"
  | "VOUCHER_EXPIRED"
  | "VOUCHER_OUT_OF_STOCK"
  | "VOUCHER_NOT_FOUND";

export interface TrueWalletError {
  error: string;
  code: TrueWalletStatusCode;
}

export interface TrueWalletSuccess {
  amount: number;
  originalData: TrueWalletVoucherResponse;
}

export type TrueWalletResult = TrueWalletError | TrueWalletSuccess;

export interface TrueWalletConfig {
  mobile: string;
}
