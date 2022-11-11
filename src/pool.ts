import type { MessageOptions } from 'vscode'
import { window } from 'vscode'
import type { RoutineInfo } from './types'
import { parseInterval } from './utils'

interface PoolImpl {
  ids: NodeJS.Timer[]
  routines: RoutineInfo[]
  cleanup(): void
  register(routine: RoutineInfo[]): void
  stop(): void
  recover(): void
}

export class Pool implements PoolImpl {
  ids: NodeJS.Timer[] = []
  routines: RoutineInfo[] = []

  constructor() {}

  register(routines: RoutineInfo[]) {
    this.routines = routines
    this.#_register()
  }

  stop() {
    this.ids.forEach((timer) => {
      clearInterval(timer)
    })
    this.ids = []
  }

  recover() {
    if (this.ids.length)
      return
    this.#_register()
  }

  #_register() {
    this.ids = []
    this.routines.forEach((routine) => {
      const { interval, name, description, silent } = routine
      const ops: MessageOptions = { modal: !silent }
      if (description)
        Object.assign(ops, { detail: description } as MessageOptions)

      const timer = setInterval(async () => {
        await window.showInformationMessage(name, ops)
      }, parseInterval(interval))
      this.ids.push(timer)
    })
  }

  cleanup() {
    this.stop()
    this.routines = []
  }
}
