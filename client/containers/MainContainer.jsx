import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../components/AppContext";
import { Switch, Route } from "react-router-dom";
import SpacesContainer from "./SpacesContainer.jsx";
import ClusterContainer from "./ClusterContainer.jsx";
import LoginPage from "../components/LoginPage.jsx";
import HomePage from "../components/HomePage.jsx";
import TeamsDisplay from "../components/TeamsDisplay.jsx";
import UsersDisplay from "../components/UsersDisplay.jsx";
import DeployPage from "../components/DeployPage.jsx";

export const LoginContext = React.createContext();

const MainContainer = (props) => {
  const {
    setIsLoggedIn,
    setIsAdmin,
    setClusterNames,
    setNamespaces,
    setTeamId,
    setFirstName,
    setLastName,
    setvClusters,
  } = useContext(AppContext);
  useEffect(() => {
    fetch("/cookies")
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.isLoggedIn);
        setIsAdmin(data.isAdmin);
        setTeamId(data.teamId);
        setFirstName(data.firstName);
        setLastName(data.lastName);
      });
    fetch("/clusters/list")
      .then((res) => res.json())
      .then((data) => {
        let names = [];
        data.forEach((element) => names.push(element.name));
        setClusterNames(names);
      });
    fetch("/spaces/fetchspaces")
      .then((res) => res.json())
      .then((data) => {
        let namespaces = [];
        data.forEach((element) => namespaces.push(element.name));
        setNamespaces(namespaces);
      });
    fetch("/vclusters")
      .then((response) => response.json())
      .then((data) => {
        const vClusterList = [];
        data.forEach((row) => vClusterList.push(<li>{row.name}</li>));
        setvClusters(vClusterList);
      });
  }, []);

  return (
    <div className='MainContainer'>
      <Switch>
        <Route path='/' exact component={LoginPage}></Route>
        <Route path='/home' exact component={HomePage} />
        <Route path='/spaces' exact component={SpacesContainer} />
        <Route path='/vcluster' exact component={ClusterContainer} />
        <Route path='/team' exact component={TeamsDisplay} />
        <Route path='/users' exact component={UsersDisplay} />
        <Route path='/deploy' exact component={DeployPage} />
      </Switch>
      {props.children}
    </div>
  );
};

export default MainContainer;
