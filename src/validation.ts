import { z } from "zod";

export const voucherUrlSchema = z.object({
  url: z
    .string({
      required_error: "กรุณากรอก URL",
    })
    .regex(/https:\/\/gift.truemoney.com\/campaign\/\?v=[a-zA-Z0-9]+/, {
      message: "URL ไม่ถูกต้อง",
    }),
});

export const extractVoucherHash = (url: string): string => {
  const match = url.match(/\?v=([a-zA-Z0-9]+)/);
  if (!match) {
    throw new Error("Invalid voucher URL format");
  }
  return match[1];
};
