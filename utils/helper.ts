import CryptoJS from "crypto-js";
import jwt, { JwtPayload } from "jsonwebtoken";

const getBlurDataURL = () => {
  return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACCAIIDASIAAhEBAxEB/8QAGgAAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/EABsQAQADAQEBAQAAAAAAAAAAAAABERICAxNh/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAXEQEBAQEAAAAAAAAAAAAAAAAAARES/9oADAMBAAIRAxEAPwD60GKaRIMAkHQoEg6AEDAqSlRSCJKVSUqiSMhCBgHbRUqhTKpoqXRUomipVCgTQpVCkVFClUKBFFMLoqBEwmYXMFSiKKl0VCJoKoA7CMMqQowCaFGFQqKlEilRKIVJSogTKVFIJoUYVE0FAHSAEACFgYKxYAhZWKZFZTKKaRZWAkhZWABWLVDCbAOixbPQ0I0sWz0NA0srRotAuxbPRaRWlptE9FPQq5krRPSZ6FaWVs9FoGli2WhoRroMtAGuxtz7Pao30NMNjYN9DTDY2DbRT0x2WxW09JnpjPZT2itZ7Ke2M9pnsVvstsJ7LYN9jbn2NiOjYc2wDTY25tjbaOrY25tjYOnY259jaDfZT2w2mexW89pnthPaZ7RrG8+iZ9HPPomfQXHRPoX0c0+iZ9Ax1fQfRyfQfRcTHX9A4/oDDG+z2w0em2W+z2w0dg22NsrFoNNpntEymZGoue0T2iekddI1Iue0T6M+umXXS43I2n0TPo5+u0T6GLy6Z9S+rkn1L6rycuz6/ocX1/QvJy9kADzmYCBgAUpTICNREs+gBqM+mXQCukZdM+gGo1GUpAaaAAUf/9k=";
};

type ToastType = "success" | "error" | "info" | "warning";

const getToastType = (status: string | null): ToastType => {
  if (status === null) {
    return "info";
  }
  switch (status) {
    case "success":
      return "success";
    case "error":
      return "error";
    case "info":
      return "info";
    case "warning":
      return "warning";
    default:
      return "info";
  }
};

const createHash = (data: string) => {
  console.log("createHash in helper :", data);

  return CryptoJS.SHA256(data).toString();
};

const createJWT = (userData: object) => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error("JWT_SECRET not defined");
  }
  try {
    const secretKey = process.env.JWT_SECRET || "your-secret";
    const token = jwt.sign(userData, secretKey, { expiresIn: "2h" });
    return token;
  } catch (err) {
    console.error("توکن معتبر نیست:", err);
    return null;
  }
};

interface DecodedToken extends JwtPayload {
  username: string;
}
const decodeJWT = (token: string): DecodedToken | null => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error("JWT_SECRET not defined");
  }
  try {
    const decoded = jwt.verify(token, secretKey) as DecodedToken;
    return decoded || null;
  } catch (err) {
    console.error("توکن معتبر نیست:", err);
    return null;
  }
};

const generateRandomOTP = () => {
  return Math.floor(10000 + Math.random() * 90000);
};

export {
  getBlurDataURL,
  getToastType,
  createHash,
  createJWT,
  decodeJWT,
  generateRandomOTP,
};
