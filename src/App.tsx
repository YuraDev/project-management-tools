import { useEffect } from 'react';
import styles from './App.module.css';
import Header from './components/header/header/Header';
import RouteLayout from './layouts/routeLayout/RouteLayout';
import { useUserThemeStore } from './store/userThemeStore';

function App() {
  const highlightMode = useUserThemeStore((state) => state.highlightMode);
  const backgroundMode = useUserThemeStore((state) => state.backgroundMode);

  useEffect(() => {
    document.body.style.color= backgroundMode === "black" ? "white" : "black";
    document.body.style.backgroundColor = backgroundMode === "black" ? "black" : "white";
  }, [highlightMode, backgroundMode]);

  return(
    <div  className={styles.structure}>
      <header  style={{ borderColor: highlightMode ? highlightMode : "purple"}}><Header/></header>
      <main><RouteLayout/></main>
    </div>
  )
}

export default App;