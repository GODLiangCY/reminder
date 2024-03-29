import type { ExtensionContext } from 'vscode'
import { commands, window, workspace } from 'vscode'
import { version } from '../package.json'
import { logger } from './log'
import type { RoutineInfo } from './types'
import { Pool } from './pool'
import { hrToMs, intervalRe, minToMs } from './constants'

let pool: Pool

export function activate(ext: ExtensionContext) {
  logger.appendLine(`[${new Date().toLocaleTimeString()}] Reminder for VS Code, v${version}\n`)

  const configs = workspace.getConfiguration('reminder')

  const { subscriptions } = ext
  const { showInputBox, showQuickPick } = window

  const routines = configs.get<RoutineInfo[]>('routine', [])
  pool = Pool.from({ routines })

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
      '5 mins later',
      '15 mins later',
      '30 mins later',
      '1 hour later',
      '2 hours later',
      'Custom',
    ], {
      placeHolder: 'On when?',
      title: 'Time',
    }).then((item) => {
      if (!item)
        return
      if (item === 'Custom') {
        return showInputBox({
          placeHolder: 'How many minutes later?',
          validateInput(value: string) {
            if (!value.match(/^\d+\.?\d*$/))
              return 'value should be a number'
          },
        }).then(res => Number(res) * minToMs)
      }

      const matches = item.match(intervalRe)!
      const [, val, suffix] = matches
      if (['hour', 'hours'].some(val => suffix.match(val)))
        return hrToMs * Number(val)
      else return minToMs * Number(val)
    })
    if (!pickResult)
      return

    const desc = await showInputBox({
      title: 'Description',
      placeHolder: 'Any detailed descriptions?',
    })

    pool.addRemindTask({
      ms: pickResult,
      name,
      ops: {
        modal: true,
        detail: `${desc ? `${desc}\n` : ''}` + `setted at ${new Date().toLocaleTimeString()}`,
      },
      once: true,
    })
  })

  subscriptions.push(disposeStop)
  subscriptions.push(disposeRecover)
  subscriptions.push(disposeOnce)
}

export function deactivate() {
  if (pool)
    pool.dispose()
}
