// search by company array
const searchedJobs = props.jobs.filter((job) =>
  job.company.toUpperCase().includes(searchValue.toUpperCase())
);

// filter by favorites array
const favJobs = props.jobs.filter((job) => {
  return job.favorite === true;
});

{
  searchValue === ""
    ? props.jobs.map((job) => {
        return <JobTile job={job} removeJob={props.deleteJob} key={job.id} />;
      })
    : searchedJobs.map((job) => {
        return <JobTile job={job} removeJob={props.deleteJob} key={job.id} />;
      });
}

{
  faved === true
    ? favJobs.map((job) => {
        return <JobTile job={job} removeJob={props.deleteJob} key={job.id} />;
      })
    : dated === true
    ? datedJobs.map((job) => {
        return <JobTile job={job} removeJob={props.deleteJob} key={job.id} />;
      })
    : interviewed === true
    ? intJobs.map((job) => {
        return <JobTile job={job} removeJob={props.deleteJob} key={job.id} />;
      })
    : searchedJobs.map((job) => {
        return <JobTile job={job} removeJob={props.deleteJob} key={job.id} />;
      });
}
