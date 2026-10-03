/**
 * DOM utility module.
 * Strictly adheres to assignment constraints:
 * - Uses ONLY document.createElement and standard DOM node methods.
 * - Zero usage of innerHTML, outerHTML, or insertAdjacentHTML.
 */

/**
 * Creates an HTML element with attributes, class names, text content, and children.
 *
 * @param {string} tag - HTML tag name to create
 * @param {Object} [options] - Configuration options
 * @param {string|string[]} [options.className] - CSS class name or array of classes
 * @param {string} [options.text] - Plain text content (safe textNode assignment)
 * @param {Object.<string, string>} [options.attrs] - HTML attributes to set
 * @param {Object.<string, Function>} [options.events] - Event listeners to attach
 * @param {Array<Node|string>} [options.children] - Child nodes or text strings to append
 * @returns {HTMLElement}
 */
export function createElement(tag, options = {}) {
  const element = document.createElement(tag);

  if (options.className) {
    if (Array.isArray(options.className)) {
      element.classList.add(...options.className.filter(Boolean));
    } else if (typeof options.className === 'string') {
      element.className = options.className;
    }
  }

  if (options.text !== undefined && options.text !== null) {
    element.textContent = String(options.text);
  }

  if (options.attrs) {
    for (const [key, value] of Object.entries(options.attrs)) {
      if (value !== undefined && value !== null) {
        element.setAttribute(key, String(value));
      }
    }
  }

  if (options.events) {
    for (const [event, handler] of Object.entries(options.events)) {
      if (typeof handler === 'function') {
        element.addEventListener(event, handler);
      }
    }
  }

  if (options.children && Array.isArray(options.children)) {
    for (const child of options.children) {
      if (child instanceof Node) {
        element.appendChild(child);
      } else if (typeof child === 'string' || typeof child === 'number') {
        element.appendChild(document.createTextNode(String(child)));
      }
    }
  }

  return element;
}

/**
 * Safely removes all child elements from a parent node without innerHTML.
 * @param {HTMLElement} parentNode
 */
export function clearChildren(parentNode) {
  if (!parentNode) return;
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
}
