import "./App.css";
import { useEffect } from "react";
import PageNotFound from "./containers/PageNotFound";
import { Route, Switch, withRouter } from "react-router-dom";
import { renderRoutesHome, renderRoutesAdmin } from "./routes";
import AuthPage from "./containers/AdminTemplate/AuthPage";
import { actTryLogin } from "./containers/AdminTemplate/AuthPage/modules/actions";
import { useDispatch } from "react-redux";

function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(props);
    // dispatch acTryLogin
    dispatch(actTryLogin(props.history));
  }, []);
  return (
    <Switch>
      {renderRoutesHome()}
      {renderRoutesAdmin()}

      {/* Trang chu - localhost:3000 */}
      {/* <Route exact path="/" component={HomePage} /> */}

      {/* Trang About - localhost:3000/about */}
      {/* <Route path="/about" component={AboutPage} /> */}

      {/* Trang list movie - localhost:3000/list-movie */}
      {/* <Route path="/list-movie" component={ListMoviePage} /> */}

      {/* Trang k ton tai - de o cuoi cung */}
      <Route path="/auth" component={AuthPage} />
      <Route path="" component={PageNotFound} />
    </Switch>
  );
}

export default withRouter(App);
