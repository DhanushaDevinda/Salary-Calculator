import './App.css';
import { BrowserRouter as Router , Route } from 'react-router-dom';

import {Earnings} from "./component/Salary Calculator";


function App() {
  return (
      <div className="container">
      <Earnings/>
    </div>
  );
}

export default App;
