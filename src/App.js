// import logo from './logo.svg';
import { BrowserRouter} from 'react-router-dom';
import './App.css'
import MainComp from './component/Mains'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MainComp/>
      </div>
    </BrowserRouter>
  );
}

export default App;
