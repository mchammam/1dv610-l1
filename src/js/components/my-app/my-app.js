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
  .visually-hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  form {
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem;
  }
  input {
    height: 55px;
    box-shadow: inset 0 3px #00000014;
    border: 1px solid #333;
    border-radius: 4px;
    color: #000;
    font-size: 2.2rem;
    text-align: center;
    letter-spacing: 3px;
  }
</style>

<form>
  <label for="name" class="visually-hidden">Enter your name:</label>
  <input id="name" type="text" placeholder="Enter your name" />
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
