import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";

// Process login - check if user exists in the database and check if password is correct
const processLogin = async ({ request, render, state, response }) => {
  const data = { email: "", password: "", errors: [] };
  const body = request.body({ type: "form" });
  const values = await body.value;
  data.email = values.get("email");
  data.password = values.get("password");

  const userFromDB = await userService.findUser(data.email);
  if (userFromDB.length != 1) {
    data.errors.push("Email not found.");
    render("login.eta", { data: data });
    return;
  }
  const user = userFromDB[0];
  const passwordMatches = await bcrypt.compare(data.password, user.password);

  if (!passwordMatches) {
    data.errors.push("Wrong password.");
    render("login.eta", { data: data });
    return;
  }

  await state.session.set("user", user);
  response.redirect("/topics");
};

// Show login page
const showLoginForm = ({ render }) => {
  render("login.eta", { data: { email: "" } });
};

export { processLogin, showLoginForm };
