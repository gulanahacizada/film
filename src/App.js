import logo from './logo.svg';
import './App.css';
import Siyahi from './Component/Siyahi';
import { Routes ,Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import Backet from './Component/Backet';
import { useSelector } from 'react-redux';

function App() {
  return (
   
    <div className="App">
      {/* <NavLink to='/' ><button className='home'>Home</button></NavLink>
      <Routes>
      <Route path="/" element={  <Siyahi />}/>
      <Route path='/backet' element={ <Backet />}/>
     </Routes> */}
     <Siyahi/>
    </div>
  );
}

export default App;
