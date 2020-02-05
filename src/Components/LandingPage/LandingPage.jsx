import React from 'react';
import TopNav from '../LandingPage/TopNav';

function LandingPage(props) {
  return (
    <div>
      <TopNav />
      {props.children}
    </div>
  );
}

export default LandingPage;
