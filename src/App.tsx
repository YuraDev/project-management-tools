import styles from './App.module.css';
import Header from './components/header/header/Header';
import RouteLayout from './layouts/routeLayout/RouteLayout';
import { useUserThemeStore } from './store/userThemeStore';

function App() {
  const highlightMode = useUserThemeStore((state) => state.highlightMode);
  return(
    <div  className={styles.structure}>
      <header  style={{ borderColor: highlightMode ? highlightMode : "purple"}}><Header/></header>
      <main><RouteLayout/></main>
    </div>
  )
}

export default App;