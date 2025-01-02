import type { Component } from 'solid-js';
import logo from './logo.svg';
import styles from './App.module.css';

/**
 * @component App
 * @description Primary application component for demonstration of SolidJS basics.
 */
const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        {/* 
          The application logo. 
          In production, consider handling large images with a bundler or 
          lazy loading if appropriate.
        */}
        <img 
          src={logo} 
          class={styles.logo} 
          alt="SolidJS logo" 
        />
        
        {/* 
          Simple text instructions. 
          Using a <code> element for inline code style. 
        */}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        {/* 
          A link pointing to SolidJS official docs on GitHub.
          We open in a new tab and use `rel="noopener noreferrer"` 
          for security best practices.
        */}
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};

export default App;
