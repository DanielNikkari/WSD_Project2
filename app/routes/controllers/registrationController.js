import { bcrypt, validasaur } from "../../deps.js";
import * as userService from "../../services/userService.js";

const registerUser = async ({ request, response, render, state }) => {
  const data = { email: "", password: "", errors: [] };
  const validationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)],
  };
  const body = request.body({ type: "form" });
  const values = await body.value;
  data.email = values.get("email");
  data.password = values.get("password");
  const [passes, errors] = await validasaur.validate(data, validationRules);
  if (passes) {
    await userService.addUser(
      data.email,
      await bcrypt.hash(data.password),
      false
    );
    response.redirect("/auth/login");
  } else {
    console.log("errors");
    console.log(errors);
    if ("email" in errors) {
      if ("required" in errors.email) {
        data.errors.push(errors.email.required);
      } else {
        data.errors.push(errors.email.isEmail);
      }
    }
    if ("password" in errors) {
      if ("required" in errors.password) {
        data.errors.push(errors.password.required);
      } else {
        data.errors.push(errors.password.minLength);
      }
    }
    //console.log(data.errors);
    render("register.eta", {
      data: data,
      user: await state.session.get("user"),
    });
  }
};

const showRegisterationForm = async ({ render, state }) => {
  render("register.eta", {
    data: { email: "" },
    user: await state.session.get("user"),
  });
};

export { showRegisterationForm, registerUser };
