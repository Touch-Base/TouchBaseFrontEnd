import React from 'react';
import '../../Styling/home.scss'

function Home() {
    return (
      <div className="homeBlock">
        <h1>
            Your entire <span className="jobWord">job</span> search, 
            <br/><span className="secondLine">all in one place.</span>
        </h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Fusce eu mauris laoreet, rutrum odio ac, interdum mi.
            Morbi eget lectus vitae nisl cursus lacinia. 
            Mauris vel eleifend ex. Fusce eu enim vel ex dignissim 
            pretium. Ut non fringilla enim..
        </p>
      </div>
    );
  }
  
  export default Home;
  