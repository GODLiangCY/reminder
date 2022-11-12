import type { ExtensionContext } from 'vscode'
import { commands, window, workspace } from 'vscode'
import { version } from '../package.json'
import { log } from './log'
import type { RoutineInfo } from './types'
import { Pool } from './pool'
import { hrToMs, intervalRe, minToMs } from './utils'

export const pool = new Pool()

export function activate(ext: ExtensionContext) {
  log.appendLine(`[${new Date().toLocaleTimeString()}] Reminder for VS Code, v${version}\n`)

  const configs = workspace.getConfiguration('reminder')
  const disabled = configs.get('disable', false)
  if (disabled) {
    log.appendLine('Reminder was disabled.')
    return
  }

  const { subscriptions } = ext
  const { showInputBox, showQuickPick, showInformationMessage } = window

  const routines = configs.get<RoutineInfo[]>('routine', [])
  pool.register(routines)

  const disposeStop = commands.registerCommand('reminder.stopReminding', () => {
    pool.stop()
  })

  const disposeRecover = commands.registerCommand('reminder.recover', () => {
    pool.recover()
  })

  const disposeOnce = commands.registerCommand('reminder.remindMeOnceLater', async () => {
    const name = await showInputBox({
      title: 'Name',
      placeHolder: 'The name?',
      prompt: 'What do you want to be reminded',
    })
    if (!name)
      return

    const pickResult = await showQuickPick([
      '5mins later',
      '15mins later',
      '30mins later',
      '1 hour later',
      '2 hours later',
      'Custom',
    ], {
      placeHolder: 'On when?',
      title: 'Time',
    }).then((item) => {
      if (item === 'Custom') {
        return showInputBox({
          placeHolder: 'How many minutes later?',
          validateInput(value) {
            if (!value.match(/^\d+\.?\d*$/))
              return 'value should be a number'
          },
        }).then(res => Number(res) * minToMs)
      }

      const [, val, suffix] = item.match(intervalRe)
      if (suffix.match('hour'))
        return hrToMs * Number(val)
      else return minToMs * Number(val)
    })
    if (!pickResult)
      return

    const desc = await showInputBox({
      title: 'Description',
      placeHolder: 'Any detailed descriptions?',
    })

    setTimeout(() => {
      showInformationMessage(name, {
        modal: true,
        detail: `${desc ? `${desc}\n` : ''}` + `Was setted at ${new Date().toLocaleTimeString()}`,
      })
    }, pickResult)
  })

  subscriptions.push(disposeStop)
  subscriptions.push(disposeRecover)
  subscriptions.push(disposeOnce)
}

export function deactivate() {}
