import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import Header from "../header/header";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { fetchOneCategory } from "../../../redux/admin/category/adminCategoryAction";
import Loading from "../../moleculs/spinner/Spinner";
import styled from "styled-components";
import Footer from "../footer/footer";
import { fetchOneBook } from "../../../redux/admin/book/adminBookAction";
import Pagination from "../../admin/user/Pagination";

const DetailCategoriPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { category, isLoading } = useSelector((state) => state.adminCategory);
  const categoryID = location.pathname.substr(
    location.pathname.lastIndexOf("/") + 1
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(20);
  var currentBooks = [];
  var filterSearch = [];
  const [search, setSearch] = useState("");
  const indexOfLastItem = currentPage * usersPerPage;
  const indexOfFirstItem = indexOfLastItem - usersPerPage;

  useEffect(() => {
    dispatch(fetchOneCategory(categoryID));
  }, []);

  if (category) {
    currentBooks = category.data.books.slice(indexOfFirstItem, indexOfLastItem);
    filterSearch = category.data.books.filter((item) => {
      return search !== "" ? item.title.includes(search) : "";
    });
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const searching = (e) => {
    setSearch(e.target.value);
  };

  const NewCard = styled.div`
    max-width: 200px;
    min-height: 210px;
    text-align: center;
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
    <>
      <Header />
      <div className="container-fluid fluid-page vh-100">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col">
              {category && (
                <h2 className="text-center">{category.data.category_name}</h2>
              )}
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-5 col-md-3">
              <button
                className="btn btn-primary text-light"
                onClick={() => {
                  history.push("/categories");
                }}
              >
                Category List
              </button>
            </div>
            <div className="col-7 col-md-5 col-xl-3">
              <form action="">
                <div className="form-row">
                  <div className="col-10">
                    <input
                      type="text"
                      name="search"
                      id="search"
                      className="form-control"
                      placeholder="Search File.."
                      onChange={searching}
                    />
                  </div>
                  <div className="col-2">
                    <button className="btn btn-primary">
                      <li className="fa fa-search text-white"></li>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="row">
              {category && category.data.books.length === 0 && (
                <h2 className="text-center">No File</h2>
              )}
              {search == ""
                ? currentBooks.map((data, index) => {
                    return (
                      <div className="col-6 col-md-3 mt-4 mb-4" key={index}>
                        <NewCard key={index}>
                          <a
                            href={`/files/${data.id}`}
                            className="text-decoration-none"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(fetchOneBook(data.id));
                              history.push(`/files/${data.id}`);
                            }}
                          >
                            <Card.Img
                              variant="top"
                              src="https://www.iconpacks.net/icons/2/free-pdf-download-icon-2617-thumb.png"
                              style={{
                                maxHeight: "150px",
                                maxWidth: "120px",
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
                                {data.title}
                              </Card.Title>
                            </Card.Body>
                          </a>
                        </NewCard>
                      </div>
                    );
                  })
                : null}
              {filterSearch &&
                filterSearch.map((data, index) => {
                  return (
                    <div className="col-6 col-md-3 mt-4 mb-4" key={index}>
                      <NewCard key={index}>
                        <a
                          href={`/files/${data.id}`}
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(fetchOneBook(data.id));
                            history.push(`/files/${data.id}`);
                          }}
                        >
                          <Card.Img
                            variant="top"
                            src="https://www.iconpacks.net/icons/2/free-pdf-download-icon-2617-thumb.png"
                            style={{
                              maxHeight: "150px",
                              maxWidth: "120px",
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
                              {data.title}
                            </Card.Title>
                          </Card.Body>
                        </a>
                      </NewCard>
                    </div>
                  );
                })}
            </div>
          )}
          <div className="d-flex justify-content-end">
            {category &&
              search == "" &&
              category.data.books.length >= usersPerPage && (
                <Pagination
                  usersPerPage={usersPerPage}
                  totalUsers={
                    category.data.books ? category.data.books.length : 0
                  }
                  paginate={paginate}
                />
              )}
          </div>
        </div>
      )}
      </div>
      <Footer />
    </>
  );
};

export default DetailCategoriPage;
