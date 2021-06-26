// import logo from './logo.svg';
import { BrowserRouter} from 'react-router-dom';
import './App.css'
import MainComp from './component/Mains'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ReactNotification />
        <MainComp/>
      </div>
    </BrowserRouter>
  );
}

export default App;
