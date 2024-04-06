import { Gallery, Home, Profile } from "../pages";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
];
