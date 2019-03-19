import { Controller } from ".."

export type ActionLogEntry = {
  name: string
  controller: Controller
  identifier: string
  eventType: string
  currentTarget: EventTarget | null
  defaultPrevented: boolean
}

export class LogController extends Controller {
  static blessCount = 0
  static actionLog: ActionLogEntry[] = []
  initializeCount = 0
  connectCount = 0
  disconnectCount = 0

  static bless() {
    super.bless()
    this.blessCount++
  }

  initialize() {
    this.initializeCount++
  }

  connect() {
    this.connectCount++
  }

  disconnect() {
    this.disconnectCount++
  }

  log(event: Event) {
    this.recordAction("log", event)
  }

  log2(event: Event) {
    this.recordAction("log2", event)
  }

  log3(event: Event) {
    this.recordAction("log3", event)
  }

  stop(event: Event) {
    this.recordAction("stop", event)
    event.stopImmediatePropagation()
  }

  get actionLog() {
    return (this.constructor as typeof LogController).actionLog
  }

  private recordAction(name: string, event: Event) {
    this.actionLog.push({
      name,
      controller: this,
      identifier: this.identifier,
      eventType: event.type,
      currentTarget: event.currentTarget,
      defaultPrevented: event.defaultPrevented
    })
  }
}
