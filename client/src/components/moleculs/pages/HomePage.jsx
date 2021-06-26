import React, {useEffect} from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import homeImage from "../../../assets/Code-typing-bro.svg";
import FolderImage from "../../../assets/folder.png";
import {useDispatch, useSelector} from "react-redux"
import { fetchCategories } from "../../../redux/admin/category/adminCategoryAction";
import Spinner from "../spinner/Spinner"
import { useHistory } from "react-router";

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory
  const { categories, isLoading } = useSelector((state) => state.adminCategory);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const goToDetailCategori = () =>{
    history.push("/detailPage")
  }

  return (

    <div>
      <Header />
      <div className="container-fluid  page-container">
        <div className="container">
          <div className="row align-items-center ">
            <div className="col-sm">
              <div className="row">
                <h1 className="">
                  Welcome user, you can get and learn programming source here
                </h1>
                <button type="button" class="btn btn-primary">
                  More
                </button>
              </div>
            </div>
            <div className="col-sm">
              <div className="img-container">
                <img src={homeImage} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid  page-container">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-sm">
              <div className="row">
                <h2 className="text-center">List all Category</h2>
              </div>
              <div className="row">
              {categories.data && categories.data.map((category)=>{
                return(
                      <div className="content-container clickable" style={{ cursor:"pointer"}} onClick={goToDetailCategori}>
                        <div className="col-sm card-container">
                          <div className="card" style={{ width: "18rem" }}>
                            <img src={FolderImage} className="card-img-top" style={{ margin:"3rem",width: "15rem"}} alt="..." />
                          <div className="card-body">
                          <h5>{category.category_name}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
