# TrueWallet Voucher SDK

A zero-dependency TypeScript SDK for redeeming TrueWallet vouchers. This SDK provides a simple way to redeem TrueWallet gift vouchers programmatically.

## Features

- 🚀 Zero runtime dependencies
- 📦 Tiny bundle size
- 💪 Full TypeScript support
- ⚡️ Native fetch API
- 🔒 Built-in URL validation
- 🌐 ESM and CommonJS support

## Requirements

- Node.js >= 18.0.0 (for native fetch API support)

## Installation

```bash
npm install voucher-ts
```

## Usage

### Basic Usage

```typescript
import { TrueWalletVoucher } from "voucher-ts";

// Initialize with your mobile number
const wallet = new TrueWalletVoucher({
  mobile: "0812345678",
});

// Redeem a voucher
try {
  const result = await wallet.redeem(
    "https://gift.truemoney.com/campaign/?v=abcdefghijk"
  );

  if ("error" in result) {
    console.error("Error:", result.error);
    return;
  }

  console.log("Success! Amount:", result.amount);
  console.log("Full response:", result.originalData);
} catch (error) {
  console.error("Failed to redeem voucher:", error);
}
```

### TypeScript Usage

The SDK provides full TypeScript support with detailed type definitions:

```typescript
import {
  TrueWalletVoucher,
  TrueWalletResult,
  TrueWalletError,
  TrueWalletSuccess,
} from "voucher-ts";

async function redeemVoucher(url: string): Promise<number | null> {
  const wallet = new TrueWalletVoucher({
    mobile: "0812345678",
  });

  const result: TrueWalletResult = await wallet.redeem(url);

  if ("error" in result) {
    // Result is TrueWalletError
    console.error("Failed:", result.error);
    console.error("Error code:", result.code);
    return null;
  }

  // Result is TrueWalletSuccess
  return result.amount;
}
```

## Error Handling

The SDK uses a discriminated union type for results. Each redemption attempt returns either a success or error result:

### Success Result Type

```typescript
interface TrueWalletSuccess {
  amount: number;
  originalData: TrueWalletVoucherResponse;
}
```

### Error Result Type

```typescript
interface TrueWalletError {
  error: string;
  code: TrueWalletStatusCode;
}
```

### Error Codes

| Code                   | Description               | Thai Message                       |
| ---------------------- | ------------------------- | ---------------------------------- |
| TARGET_USER_REDEEMED   | Voucher already redeemed  | ซองของขวัญนี้ถูกใช้ไปแล้ว          |
| INTERNAL_ERROR         | Internal server error     | ไม่พบซองของขวัญหรือ URL ผิดพลาด    |
| CANNOT_GET_OWN_VOUCHER | Cannot redeem own voucher | ไม่สามารถใช้ซองของขวัญของตัวเองได้ |
| VOUCHER_EXPIRED        | Voucher has expired       | ซองของขวัญหมดอายุแล้ว              |
| VOUCHER_OUT_OF_STOCK   | Voucher is out of stock   | ซองของขวัญถูกใช้ไปแล้ว             |
| VOUCHER_NOT_FOUND      | Voucher not found         | ไม่พบซองของขวัญนี้                 |

### URL Validation

The SDK includes built-in validation for TrueWallet voucher URLs. Invalid URLs will throw a `ValidationError`:

```typescript
// These will throw ValidationError
await wallet.redeem(""); // Error: กรุณากรอก URL
await wallet.redeem("https://wrong-url.com"); // Error: URL ไม่ถูกต้อง
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC License
