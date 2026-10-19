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

export function clearChildren(parentNode) {
  if (!parentNode) return;
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
}
