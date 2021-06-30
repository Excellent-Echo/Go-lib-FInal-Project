import React, { useEffect } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import { useHistory } from "react-router";
import learningbro from "../../../assets/Learning-bro.svg";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import contentAction from "../../../redux/content/contentAction";
import { Card } from "react-bootstrap";
import noImage from "../../../assets/noimage.png";
import { Spinner, Button } from "react-bootstrap";
import { fetchLengthCategories } from "../../../redux/admin/category/adminCategoryAction";
import Loading from "../spinner/Spinner";
import { fetchLengthBooks } from "../../../redux/admin/book/adminBookAction";
import file from "../../../assets/file.png";
import category from "../../../assets/category.png";

function LandingPage() {
  const contentData = useSelector((state) => state.content);
  const dispatch = useDispatch();
  const history = useHistory();
  const { length, isLoading } = useSelector((state) => state.adminCategory);
  const { lengthBooks } = useSelector((state) => state.adminBook);

  useEffect(() => {
    dispatch(contentAction.fetchAllContents());
    dispatch(fetchLengthCategories());
    dispatch(fetchLengthBooks());
  }, []);

  const NewCard = styled.div`
    border-radius: 4px;
    min-height: 430px;
    max-height: 430px;
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
      <div className="container-fluid  section1-container">
        <div className="container">
          <div className="row align-items-center mt-5">
            <div className="col-sm">
              <div className="row">
                <h1 className="landing-text">
                  “No matter how busy you may think you are, you must find time
                  for reading, or surrender yourself to self-chosen ignorance.”
                </h1>
                <p>― Atwood H. Townsend</p>
                <br />
                <button
                  onClick={() => {
                    history.push("/login");
                  }}
                  type="button"
                  className="btn btn-primary"
                >
                  Go to Home Page
                </button>
              </div>
            </div>
            <div className="col-sm">
              <div className="img-container">
                <img
                  className="img-fluid d-sm-none d-md-inline-block"
                  src={learningbro}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid section2-container py-5 mb-3">
        <div className="container py-5">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="row ">
              {length.data && (
                <div className="col-sm text-center unique">
                  <img src={category} alt="" width="100px" className="mb-3" />{" "}
                  <br />
                  <h5>{length.data}+ Categories</h5>
                </div>
              )}
              {lengthBooks.data && (
                <div className="col-sm text-center">
                  <img src={file} alt="" width="100px" className="mb-3" />{" "}
                  <br />
                  <h5>{lengthBooks.data}+ Files</h5>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="container-fluid  page-container section3-container">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-sm">
              <div className="row">
                <h2 className="text-center">News</h2>
              </div>
              <div className="row content-container">
                {Object.keys(contentData).length === 0 ? (
                  <div className="d-flex justify-content-center align-items-center vh-100">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  <div className="col-sm d-flex justify-content-center">
                    <div className="row">
                      {contentData &&
                        contentData.data.articles
                          .slice(0, 4)
                          .map((data, index) => {
                            return (
                              <div className="col-12 col-md-4 col-xl-3 mb-3">
                                <NewCard key={index}>
                                  <a
                                    href={data.url}
                                    className="text-decoration-none"
                                    target="_blank"
                                  >
                                    <Card.Img
                                      variant="top"
                                      src={data.urlToImage || noImage}
                                      style={{
                                        maxHeight: "25vh",
                                        minHeight: "25vh",
                                        padding: "1rem",
                                      }}
                                    />
                                    <Card.Body
                                      className="text-left"
                                      style={{ fontSize: "0.8rem" }}
                                    >
                                      <Card.Title
                                        style={{
                                          fontSize: "1rem",
                                          display: "-webkit-box",
                                          WebkitBoxOrient: "vertical",
                                          WebkitLineClamp: "5",
                                          overflow: "hidden",
                                          textAlign: "justify",
                                        }}
                                      >
                                        {data.title}
                                      </Card.Title>
                                      <Card.Text
                                        style={{
                                          display: "-webkit-box",
                                          WebkitBoxOrient: "vertical",
                                          WebkitLineClamp: "2",
                                          overflow: "hidden",
                                          color: "black",
                                        }}
                                      >
                                        {data.description}
                                      </Card.Text>
                                    </Card.Body>
                                  </a>
                                </NewCard>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                )}
                <div className="mt-4 text-center">
                  <Button href="/news" className="btn btn-primary text-light">
                    More News
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
