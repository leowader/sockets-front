import React from "react";
import Home from "../components/home/Home";
export {Home}
export const Profile = React.lazy(()=>   import ("../components/profile/Profile"));
export const Gallery = React.lazy(()=> import ("../components/profile/Gallery"))