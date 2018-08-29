import { Controller } from "@stimulus/core"

export default class extends Controller {
  get viewTarget() {
    return this.targets.find("view") || this.element
  }

  prepend(event: CustomEvent) {
    this.perform(event, (element, html) => element.insertAdjacentHTML("afterbegin", html))
  }

  append(event: CustomEvent) {
    this.perform(event, (element, html) => element.insertAdjacentHTML("beforeend", html))
  }

  update(event: CustomEvent) {
    this.perform(event, (element, html) => element.innerHTML = html)
  }

  replace(event: CustomEvent) {
    this.perform(event, (element, html) => element.outerHTML = html)
  }

  delete(event: CustomEvent) {
    this.perform(event, (element) => element.outerHTML = "")
  }

  async perform(event: CustomEvent, callback: (element: Element, html: string) => void) {
    const html = await event.detail.html
    requestAnimationFrame(() => callback(this.viewTarget, html))
  }
}
