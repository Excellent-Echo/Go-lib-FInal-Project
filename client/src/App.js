import "./App.css";
import Register from "./components/moleculs/pages/register";
import Login from "./components/moleculs/pages/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContentPage from "./components/moleculs/pages/ContentPage";
import LandingPage from "./components/moleculs/pages/LandingPage";
import NotFound from "./components/moleculs/pages/NotFound";
import HomePage from "./components/moleculs/pages/HomePage";
import DetailCategoriPage from "./components/moleculs/pages/DetailCategoriPage";
import UserDashboard from "./components/moleculs/pages/admin/user/UserDashboard";
import CreateUserPage from "./components/moleculs/pages/admin/user/AddUser";
import UpdateUserPage from "./components/moleculs/pages/admin/user/UpdateUser";
import CategoryDashboard from "./components/moleculs/pages/admin/category/CategoryDashboard";
import CreateCategoryPage from "./components/moleculs/pages/admin/category/AddCategory";
import UpdateCategoryPage from "./components/moleculs/pages/admin/category/UpdateCategory";
import BookDashboard from "./components/moleculs/pages/admin/book/bookDashboard";
import CreateBookPage from "./components/moleculs/pages/admin/book/AddBook";
import UpdateBookPage from "./components/moleculs/pages/admin/book/UpdateBook";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";
import OnlyPublicRoute from "./components/routes/OnlyPublicRoute";
import DetailFile from "./components/moleculs/pages/DetailFile";
import AllCategori from "./components/moleculs/pages/Allcategory";
import Update from "./components/moleculs/pages/profileuser";

function App() {
  return (
    <div className="App position-relative">
      {/* <Darkmode/> */}
      <Router>
        <Switch>
          <PrivateRoute path="/home" exact component={HomePage} />
          <PrivateRoute path="/categories/:id" exact component={DetailCategoriPage} />
          <PrivateRoute path="/files/:id" exact component={DetailFile} />
          <PrivateRoute path="/categories" exact component={AllCategori} />
          <PrivateRoute path="/profile" exact component={Update} />
          <AdminRoute path="/admin/users" exact component={UserDashboard} />
          <AdminRoute path="/admin/users/add" component={CreateUserPage} />
          <AdminRoute path="/admin/users/edit/:id" exact component={UpdateUserPage} />
          <AdminRoute path="/admin/categories" exact component={CategoryDashboard} />
          <AdminRoute path="/admin/categories/add" exact component={CreateCategoryPage} />
          <AdminRoute path="/admin/categories/edit/:id" exact component={UpdateCategoryPage} />
          <AdminRoute path="/admin/books" exact component={BookDashboard} />
          <AdminRoute path="/admin/books/add" exact component={CreateBookPage} />
          <AdminRoute path="/admin/books/edit/:id" exact component={UpdateBookPage} />
          <OnlyPublicRoute path="/login" exact component={Login} />
          <OnlyPublicRoute path="/register" exact component={Register} />
          <Route path="/news" exact component={ContentPage} />
          <Route path="/" exact component={LandingPage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div >
  );
}

export default App;
