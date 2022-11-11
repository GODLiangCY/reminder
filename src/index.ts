import type { ExtensionContext } from 'vscode'
import { commands, window, workspace } from 'vscode'
import { version } from '../package.json'
import { log } from './log'
import type { RoutineInfo } from './types'
import { Pool } from './pool'

let pool = new Pool()

export function activate(ext: ExtensionContext) {
  log.appendLine(`[${new Date().toLocaleTimeString()}] Reminder for VS Code, v${version}\n`)

  const configs = workspace.getConfiguration('reminder')
  const disabled = configs.get('disable', false)
  if (disabled) {
    log.appendLine('Reminder was disabled.')
    return
  }

  const { subscriptions } = ext

  const routines = configs.get<RoutineInfo[]>('routine', [])
  try {
    pool.register(routines)
  }
  catch (e) {
    window.showErrorMessage(e)
    return
  }

  const disposeStop = commands.registerCommand('reminder.stopReminding', () => {
    pool.stop()
  })

  const disposeRecover = commands.registerCommand('reminder.recover', () => {
    pool.recover()
  })

  subscriptions.push(disposeStop)
  subscriptions.push(disposeRecover)
}

export function deactivate() {
  pool.cleanup()
  pool = null
}
