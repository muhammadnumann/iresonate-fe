import { getCurrentUser, isLoggedIn } from "src/utils/helper";

export function withAuthLogin(Component) {
  const loggedIn = isLoggedIn(getCurrentUser());

  const Restriction = (props) => {
    return <Component {...props} />;
  };

  return Restriction;
}
