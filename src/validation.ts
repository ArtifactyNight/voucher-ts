export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

const TRUEWALLET_URL_REGEX =
  /^https:\/\/gift\.truemoney\.com\/campaign\/\?v=[a-zA-Z0-9]+$/;

export function validateVoucherUrl(url: string): void {
  if (!url) {
    throw new ValidationError("กรุณากรอก URL");
  }

  if (!TRUEWALLET_URL_REGEX.test(url)) {
    throw new ValidationError("URL ไม่ถูกต้อง");
  }
}

export function extractVoucherHash(url: string): string {
  const match = url.match(/\?v=([a-zA-Z0-9]+)/);
  if (!match) {
    throw new ValidationError("Invalid voucher URL format");
  }
  return match[1];
}
