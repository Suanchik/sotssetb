import './App.scss';
import Header from './components/Header/header';
import NavBar from './components/NavBar/navBar';
import Content from './components/Content/content';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { initializedAsync } from './redux/reducers/app';
import loading from './assets/perfect.gif';

function App() {

  const initialized = useSelector(state => state.AppData.initialized);
  const isAuth = useSelector(state => state.AuthData.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializedAsync())
  }, []);

  return (
      <>
          
            <div className="App">
              <Header/>
              <NavBar/>
              {
                 !initialized ? 
                 <div className='initializedLoader'>
                  <img src={loading} alt="loading"/>
                 </div>:
                <Content/>
                }
            </div>
      </>
    
  );
}

export default App;

