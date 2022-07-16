import * as mainService from "../../services/mainService.js";

const showMain = async ({ render }) => {
  // Get stats from the database tables
  const stats = await mainService.getStatistics();
  render("main.eta", { statistics: stats });
};

export { showMain };
