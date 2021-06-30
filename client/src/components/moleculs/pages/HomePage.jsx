import React, { useEffect } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import homeImage from "../../../assets/Code-typing-bro.svg";
import FolderImage from "../../../assets/folder.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchOneCategory,
} from "../../../redux/admin/category/adminCategoryAction";
import styled from "styled-components";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";
import Loading from "../spinner/Spinner";
import { Spinner, Button } from "react-bootstrap";

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { categories, isLoading } = useSelector((state) => state.adminCategory);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const NewCard = styled.div`
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
    transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
      0.3s box-shadow,
      0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
    }
  `;

  return (
    <div>
      <Header />
      <div className="container-fluid  page-container">
        <div className="container">
          <div className="row align-items-center ">
            <div className="col-sm">
              <div className="row">
                <h1 className="">
                  Welcome, you can get and learn programming source here
                </h1>
                {/* <button type="button" className="btn btn-primary text-light">
                  More
                </button> */}
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
                <h2 className="text-center mb-5">Category List</h2>
              </div>
              {isLoading ? (
                <Loading />
              ) : (
                <div className="row justify-content-center">
                  {categories.data &&
                    categories.data.slice(0, 4).map((category, index) => {
                      return (
                        <div className="col-6 col-md-3 mb-3">
                          <NewCard key={index}>
                            <a
                              href={`/categories/${category.id}`}
                              className="text-decoration-none"
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch(fetchOneCategory(category.id));
                                history.push(`/categories/${category.id}`);
                              }}
                            >
                              <Card.Img
                                variant="top"
                                src={FolderImage}
                                style={{
                                  maxHeight: "20vh",
                                  minHeight: "20vh",
                                  padding: "1rem",
                                }}
                              />
                              <Card.Body
                                className="text-center"
                                style={{ fontSize: "0.8rem" }}
                              >
                                <Card.Title
                                  style={{
                                    fontSize: "1rem",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: "5",
                                    overflow: "hidden",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {category.category_name}
                                </Card.Title>
                              </Card.Body>
                            </a>
                          </NewCard>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            <div className="mt-4 text-center">
              <Button href="/categories" className="btn btn-primary text-light">
                More Categories
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
