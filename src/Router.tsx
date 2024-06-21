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
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/animals",
        element: <Animals />,
        loader: animalsLoader,
      },
      {
        path: "/animal/:animalid",
        element: (
          <Suspense fallback={<Spinner />}>
            <Animal />
          </Suspense>
        ),
      },
    ],
  },
]);
