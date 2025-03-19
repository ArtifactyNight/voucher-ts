import {
  TrueWalletConfig,
  TrueWalletResult,
  TrueWalletVoucherResponse,
  TrueWalletStatusCode,
} from "./types";
import {
  validateVoucherUrl,
  extractVoucherHash,
  ValidationError,
} from "./validation";

const ERROR_MESSAGES: Record<TrueWalletStatusCode, string> = {
  TARGET_USER_REDEEMED: "ซองของขวัญนี้ถูกใช้ไปแล้ว",
  INTERNAL_ERROR: "ไม่พบซองของขวัญหรือ URL ผิดพลาด",
  CANNOT_GET_OWN_VOUCHER: "ไม่สามารถใช้ซองของขวัญของตัวเองได้",
  VOUCHER_EXPIRED: "ซองของขวัญหมดอายุแล้ว",
  VOUCHER_OUT_OF_STOCK: "ซองของขวัญถูกใช้ไปแล้ว",
  VOUCHER_NOT_FOUND: "ไม่พบซองของขวัญนี้",
  SUCCESS: "สำเร็จ",
};

export class TrueWalletVoucher {
  private config: TrueWalletConfig;

  constructor(config: TrueWalletConfig) {
    this.config = config;
  }

  async redeem(url: string): Promise<TrueWalletResult> {
    try {
      // Validate URL format
      validateVoucherUrl(url);

      // Extract hash from URL
      const hash = extractVoucherHash(url);

      // Make API request
      const response = await fetch(
        `https://gift.maythiwat.com/campaign/vouchers/${hash}/redeem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: this.config.mobile,
            voucher_hash: hash,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = (await response.json()) as TrueWalletVoucherResponse;

      // Handle non-success cases
      if (result.status.code !== "SUCCESS") {
        return {
          error:
            ERROR_MESSAGES[result.status.code] || "เกิดข้อผิดพลาดกับซองของขวัญ",
          code: result.status.code,
        };
      }

      // Handle success case
      if (!result.data?.voucher) {
        return {
          error: "Invalid response format",
          code: "INTERNAL_ERROR",
        };
      }

      const stringAmt = result.data.voucher.redeemed_amount_baht.replace(
        /,/g,
        ""
      );
      const amount = Number(stringAmt);

      if (isNaN(amount)) {
        return {
          error: "Invalid amount format",
          code: "INTERNAL_ERROR",
        };
      }

      return {
        amount,
        originalData: result,
      };
    } catch (error) {
      if (error instanceof ValidationError) {
        return {
          error: error.message,
          code: "INTERNAL_ERROR",
        };
      }

      if (error instanceof Error) {
        return {
          error: error.message,
          code: "INTERNAL_ERROR",
        };
      }

      return {
        error: "Unknown error occurred",
        code: "INTERNAL_ERROR",
      };
    }
  }
}

export * from "./types";
export * from "./validation";
