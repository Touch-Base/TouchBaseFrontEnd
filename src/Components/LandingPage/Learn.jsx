import React from "react";
import "../../Styling/learn.scss";
import "../../Styling/landingPageMobile/learnMobile.scss";
import { motion } from "framer-motion";
import whiteLogo from "../../img/touchbasewhite.png";

function Learn() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: "-50%" }}
      className="learnBlock"
    >
      <div className="learnHeader">
        <h2>What is</h2>
        <img className="learnLogo" src={whiteLogo} alt="whiteLogo" />
        <h2>?</h2>
      </div>
      <div className="contentSections">
        <p>
          <span className="tColor">TouchBase</span> was created by a job-seeking
          web developer who knew first hand how frustrating and disorganized
          looking for a new job can be. The app is{" "}
          <span className="tColor">designed to take the stress out</span> of
          keeping track of all the jobs you've recently applied to and the
          connections with professionals you've made along the way.
        </p>
        <p>
          <span className="tColor">TouchBase</span> knows about that spreadsheet
          you use to throw in all your jumbled job application information and
          wants you to eliminate that. Get what you really want out of keeping
          the job hunt in order by{" "}
          <span className="tColor">tracking and managing</span> notes, dates,
          companies, and career guiding prospects.
        </p>
      </div>
    </motion.div>
  );
}

export default Learn;
