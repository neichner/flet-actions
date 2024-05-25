import { cmd } from "./cmd"
import { Platform } from "./platform"

export async function build(platform: Platform) {
  cmd("flet", "build", platform.toString())
}