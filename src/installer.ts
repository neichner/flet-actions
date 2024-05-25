import which from 'which'
import { cmd } from './cmd'
import { Platform } from './platform'

export async function installDependencies(platform: Platform) : Promise<Error | null> {
  const hasPip = await which('pip3', { nothrow: true })
  if(!hasPip) {
    return new Error("Expected pip to be installed, install python before running this command")
  }
  const hasFlet = await which('flet', { nothrow: true })
  if(!hasFlet) 
    await cmd("pip3", "install", "flet")

  if(platform === Platform.iOS) {
    //cmd("pip3", "install", "git+https://github.com/flet-dev/python-for-ios.git")    
    //cmd("toolchain", "build", "numpy")
  }
  
  if(!await which('flet', { nothrow: true })) {
    return new Error("Failed to install flet")
  }
  return null
}