/**
 * my-app web component module.
 *
 * @author Mohammed Chammam <mc223gr@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
  form {
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem;
  }
</style>

<form>
  <label for="name">Enter your name:</label>
  <input id="name" type="text" placeholder="Enter your name" />
  <button type="submit">Submit</button>
</form>
`

customElements.define(
  'my-app',
  /**
   * Represents a my-app element.
   */
  class extends HTMLElement {
    /**
     * Used to remove the event listeners on component disconnect.
     *
     * @type {AbortController}
     */
    #abortController = new AbortController()

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' }).append(
        template.content.cloneNode(true)
      )
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.shadowRoot.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault()
        const name = this.shadowRoot.querySelector('form #name').value

        this.#submit(name)
      }, { signal: this.#abortController.signal })
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
    }

    /**
     * Handle form submit.
     *
     * @param {string} name - The name of the user.
     */
    async #submit (name) {
      console.log(name)
    }
  }
)
