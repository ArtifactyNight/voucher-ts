# TrueWallet Voucher SDK

A TypeScript SDK for redeeming TrueWallet vouchers.

## Installation

```bash
npm install voucher-ts
```

## Usage

```typescript
import { TrueWalletVoucher } from "voucher-ts";

// Initialize the SDK with your mobile number
const wallet = new TrueWalletVoucher({
  mobile: "0812345678",
});

// Redeem a voucher
async function redeemVoucher() {
  const result = await wallet.redeem(
    "https://gift.truemoney.com/campaign/?v=abcdefghijk"
  );

  if ("error" in result) {
    console.error("Error:", result.error);
    return;
  }

  console.log("Success! Amount:", result.amount);
  console.log("Full response:", result.originalData);
}
```

## Error Handling

The SDK returns a discriminated union type `TrueWalletResult` which can be either:

- A success result containing the amount and original response data
- An error result containing an error message and error code

Error codes include:

- `TARGET_USER_REDEEMED` - Voucher already redeemed
- `INTERNAL_ERROR` - Internal server error
- `CANNOT_GET_OWN_VOUCHER` - Cannot redeem your own voucher
- `VOUCHER_EXPIRED` - Voucher has expired
- `VOUCHER_OUT_OF_STOCK` - Voucher is out of stock
- `VOUCHER_NOT_FOUND` - Voucher not found

## URL Validation

The SDK includes built-in validation for TrueWallet voucher URLs using Zod. Invalid URLs will result in an error.
