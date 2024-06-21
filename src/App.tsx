import { RouterProvider } from 'react-router-dom';
import './styling/App.css';
import { router } from "./Router";

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
