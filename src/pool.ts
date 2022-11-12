import type { MessageOptions } from 'vscode'
import { window } from 'vscode'
import type { Ref } from '@vue/runtime-core'
import { ref, watchEffect } from '@vue/runtime-core'
import type { RoutineInfo } from './types'
import { parseIntervalToMs, sleep } from './utils'
import { log } from './log'
import { pool } from './index'

interface PoolImpl {
  isStoped: Ref<boolean>
  register(routine: RoutineInfo[]): void
  stop(): void
  recover(): void
}

export class Pool implements PoolImpl {
  isStoped = ref(false)

  register(routines: RoutineInfo[]) {
    this.#_register(routines)
  }

  stop() {
    this.isStoped.value = true
  }

  recover() {
    this.isStoped.value = false
  }

  #_register(routines: RoutineInfo[]) {
    routines.forEach((routine) => {
      const { interval, name, description, silent } = routine
      const ops: MessageOptions = { modal: !silent }
      if (description)
        Object.assign(ops, { detail: description } as MessageOptions)

      let _interval: undefined | number
      try {
        _interval = parseIntervalToMs(interval)
      }
      catch (e: unknown) {
        log.appendLine(`the value of interval config for ${name} is not valid`)
        return
      }

      const remind = async () => {
        await sleep(_interval)

        await window.showInformationMessage(name, ops, 'OK', 'Stop reminding me in the rest time').then((res) => {
          if (res !== 'Stop reminding me in the rest time')
            remind()

          else
            pool.stop()
        })
      }

      watchEffect(() => {
        if (!this.isStoped.value)
          remind()
      })
    })
  }
}
