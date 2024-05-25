import { spawn } from 'child_process'
import process from 'process'

type CmdResult = {
  code: Number | null
  result: any
}

export function cmd(...command: string[]): Promise<CmdResult> {
  let p = spawn(command[0], command.slice(1))
  let result = ''
  return new Promise(resolve => {
    p.stdout.on('data', x => {
      process.stdout.write(x.toString())
      result += x.toString()
    })
    p.stderr.on('data', x => {
      process.stderr.write(x.toString())
      result += x.toString()
    })
    p.on('exit', code => {
      resolve({
        code: code,
        result: result
      })
    })
  })
}
