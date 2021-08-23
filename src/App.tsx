import './App.css';
import { Provider } from 'react-redux';
import Home from './containers/Home/Home';
import { store } from './configure-store';

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Home/>
      </Provider>
    </div>
  );
}

export default App;
