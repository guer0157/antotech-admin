import React from "react";
import "../../App.scss";
import "./Home.scss";
import "../../shared/list-container/ListContainer";
import ListContainer from "../../shared/list-container/ListContainer";

function Home() {
  return (
    <div className="home-component">
      <ListContainer></ListContainer>
    </div>
  );
}

export default Home;
