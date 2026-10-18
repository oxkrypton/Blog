import { DATA } from "@/data/resume";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Embed local assets so the build does not depend on the live website.
export async function getOpenGraphAssets() {
  const publicDir = path.join(process.cwd(), "public");
  const [cabinetGrotesk, clashDisplay, avatar] = await Promise.all([
    readFile(path.join(publicDir, "fonts/CabinetGrotesk-Medium.ttf")),
    readFile(path.join(publicDir, "fonts/ClashDisplay-Semibold.ttf")),
    readFile(path.join(publicDir, DATA.avatarUrl)),
  ]);

  return {
    fontData: { cabinetGrotesk, clashDisplay },
    imageUrl: `data:image/png;base64,${avatar.toString("base64")}`,
  };
}
