import "./pico.scss";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import ViewCreator from "./pages/ViewCreator";
import MainLayout from "./components/MainLayout";

const router = createBrowserRouter([
    {       
      path: "/",
      element: <MainLayout />,
      children: [ 
        {
            index: true,
            element: <Home />,
        },
        {
            path: "add-creator",
            element: <AddCreator />,
        },
        {
            path: "creator/:creatorId",
            element: <ViewCreator />,
            children: [
                {
                    path: "edit",
                    element: <EditCreator />,
                },
            ],
        },
        ],
    },  
]);

function App() {
    return (
      <RouterProvider router={router} fallbackElement={<progress />} />
    );
}

export default App;
