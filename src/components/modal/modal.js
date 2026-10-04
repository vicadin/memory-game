import { createElement, clearChildren } from '../../utils/dom.js';
import './modal.css';

export class Modal {
  constructor() {
    this.isOpen = false;
    this.onCloseCallback = null;

    this.titleElement = createElement('h2', {
      className: 'modal-title',
    });

    this.closeIconBtn = createElement('button', {
      className: 'modal-close-icon-btn',
      attrs: {
        type: 'button',
        'aria-label': 'Close dialog',
      },
      text: '✕',
      events: {
        click: () => this.close(),
      },
    });

    this.headerElement = createElement('div', {
      className: 'modal-header',
      children: [this.titleElement, this.closeIconBtn],
    });

    this.bodyElement = createElement('div', {
      className: 'modal-body',
    });

    this.actionsElement = createElement('div', {
      className: 'modal-actions',
    });

    this.containerElement = createElement('div', {
      className: 'modal-container',
      attrs: {
        role: 'dialog',
        'aria-modal': 'true',
      },
      children: [this.headerElement, this.bodyElement, this.actionsElement],
      events: {
        click: (e) => e.stopPropagation(),
      },
    });

    this.backdropElement = createElement('div', {
      className: 'modal-backdrop',
      children: [this.containerElement],
      events: {
        click: (e) => {
          if (e.target === this.backdropElement) {
            this.close();
          }
        },
      },
    });

    this.handleKeyDown = (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        e.preventDefault();
        this.close();
      }
    };

    document.body.appendChild(this.backdropElement);
  }

  open({ title, body, actions = [], onClose = null }) {
    this.titleElement.textContent = title || '';
    this.onCloseCallback = onClose;

    clearChildren(this.bodyElement);
    if (Array.isArray(body)) {
      body.forEach((el) => el && this.bodyElement.appendChild(el));
    } else if (body instanceof Node) {
      this.bodyElement.appendChild(body);
    }

    clearChildren(this.actionsElement);
    actions.forEach((btn) => btn && this.actionsElement.appendChild(btn));

    this.isOpen = true;
    this.backdropElement.classList.add('open');
    document.body.classList.add('modal-open');
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      appContainer.inert = true;
    }
    window.addEventListener('keydown', this.handleKeyDown);
  }

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.backdropElement.classList.remove('open');
    document.body.classList.remove('modal-open');
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      appContainer.inert = false;
    }
    window.removeEventListener('keydown', this.handleKeyDown);

    if (typeof this.onCloseCallback === 'function') {
      this.onCloseCallback();
      this.onCloseCallback = null;
    }
  }
}
