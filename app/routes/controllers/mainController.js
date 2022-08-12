import * as mainService from "../../services/mainService.js";

const showMain = async ({ render, state }) => {
  // Get stats from the database tables
  const user = await state.session.get("user");
  //console.log(user);
  const stats = await mainService.getStatistics();
  render("main.eta", { statistics: stats, user: user });
};

export { showMain };
