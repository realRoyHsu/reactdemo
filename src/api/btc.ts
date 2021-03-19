import request from "@/utils/request.ts";

export function getBtcPrice(): Promise<{ BCH: Number; BTC: Number }> {
  return request.get("https://markets.api.bitcoin.com/live/bitcoin");
}
