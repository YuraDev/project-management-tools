import styles from './App.module.css';
import Header from './components/header/header/Header';
import RouteLayout from './layouts/routeLayout/RouteLayout';

function App() {
  return(
    <div  className={styles.structure}>
      <header><Header/></header>
      <main><RouteLayout/></main>
    </div>
  )
}

export default App;