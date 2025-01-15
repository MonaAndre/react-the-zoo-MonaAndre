// Router.ts
import { createBrowserRouter } from "react-router-dom";
import { Animals } from "./pages/Animals";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { animalsLoader } from "./loaders/animalsLoader";
import { Suspense } from "react";
import { Spinner } from "./components/Spinner";
import { Animal } from "./pages/Animal";

export const router = createBrowserRouter([
  {
    path: "/react-the-zoo-MonaAndre/",
    element: <Layout />,
    children: [
      {
        path: "/react-the-zoo-MonaAndre/",
        element: <Home />,
      },
      {
        path: "/react-the-zoo-MonaAndre/animals",
        element: <Animals />,
        loader: animalsLoader,
      },
      {
        path: "/react-the-zoo-MonaAndre/animal/:animalid",
        element: (
          <Suspense fallback={<Spinner />}>
            <Animal />
          </Suspense>
        ),
      },
    ],
  },
]);
