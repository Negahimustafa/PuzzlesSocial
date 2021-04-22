import './App.css';
import  Home  from './pages/home';
import { UserContextProvider } from './contexts/user';

function App() {

  return (

    <UserContextProvider>
      <div className="app">
     <Home />
    </div>
    </UserContextProvider>

  );

};

export default App;
