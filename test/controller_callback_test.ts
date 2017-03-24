import { Controller } from "stimulus"
import { testGroup, test, createControllerElement, setFixture } from "./test_helpers"

testGroup("Controller callbacks", function() {
  test("intialize, connect, disconnect", function (assert) {
    const done = assert.async()

    const identifier = "test"
    const element = createControllerElement(identifier)
    const counts = { initialize: 0, connect: 0, disconnect: 0 }

    this.application.register(identifier, class extends Controller {
      initialize() { counts.initialize++ }
      connect()    { counts.connect++    }
      disconnect() { counts.disconnect++ }
    })

    setFixture(element, function () {
      assert.deepEqual(counts, { initialize: 1, connect: 1, disconnect: 0 })

      setFixture("", function () {
        assert.deepEqual(counts, { initialize: 1, connect: 1, disconnect: 1 })

        setFixture(element, function () {
          assert.deepEqual(counts, { initialize: 1, connect: 2, disconnect: 1 })
          done()
        })
      })
    })
  })

  test("inline action <button>", function (assert) {
    const done = assert.async()

    const identifier = "test"
    const element = createControllerElement(identifier, `<button data-${identifier}-action="nextStep">next</button>`)
    const button = element.firstElementChild as HTMLButtonElement
    const events: Event[] = []

    this.application.register(identifier, class extends Controller {
      nextStep(event) {
        events.push(event)
      }
    })

    setFixture(element, function() {
      button.click()
      assert.equal(events.length, 1)
      assert.equal(events[0].type, "click")
      assert.equal(events[0].defaultPrevented, true)
      done()
    })
  })

})