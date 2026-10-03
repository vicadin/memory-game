import './styles/header.css';
import { createHeader } from './components/Header/Header.js';

const appContainer = document.body;

const header = createHeader({
  
});

appContainer.appendChild(header.element);