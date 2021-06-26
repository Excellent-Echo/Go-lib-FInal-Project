import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ProgressBar, Form, Button, Alert } from "react-bootstrap";
import ToggleMenu from "../ToggleMenu";
import { createBook } from "../../../redux/admin/book/adminBookAction";
import { fetchCategories } from "../../../redux/admin/category/adminCategoryAction";

function CreateBook() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [urlVideo, setUrlVideo] = useState("");
  const [categoryID, setCategoryID] = useState(0);
  const [file, setFile] = useState("");
  const { error, isLoading, fileProgress } = useSelector(
    (state) => state.adminBook
  );
  const { categories } = useSelector((state) => state.adminCategory);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const formData = new FormData();

  const submitCreateBook = (e) => {
    e.preventDefault();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("url_video", urlVideo);
    formData.append("category_id", categoryID);

    dispatch(createBook(formData, history));
  };

  return (
    <>
      <div className="mt-3" id="page-content-wrapper">
        <div className="d-flex justify-content-between">
          <ToggleMenu />
        </div>
        <h3>Add New Book</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="d-flex justify-content-center">
            <Form
              className="col-sm-6 mt-5"
              onSubmit={submitCreateBook}
              encType="multipart/form-data"
            >
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Title"
                  required
                  onChange={(e) => {
                    e.preventDefault();
                    setTitle(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Control
                  type="text"
                  name="url_video"
                  placeholder="Embed Video"
                  onChange={(e) => {
                    e.preventDefault();
                    setUrlVideo(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control
                  type="file"
                  name="file"
                  onChange={(e) => {
                    e.preventDefault();
                    setFile(e.target.files[0]);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formButton">
                <select
                  className="custom-select"
                  id="inputGroupSelect01"
                  name="category_id"
                  onClick={(e) => {
                    e.preventDefault();
                    setCategoryID(e.target.value);
                  }}
                >
                  <option selected>Choose category ...</option>
                  {categories.data &&
                    categories.data.map((data, index) => {
                      return (
                        <option key={index} value={data.id}>
                          {data.category_name}
                        </option>
                      );
                    })}
                </select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formButton">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={isLoading ? true : false}
                >
                  {isLoading ? "Loading..." : "Add"}
                </button>
              </Form.Group>
              {fileProgress !== 0 && (
                <ProgressBar
                  animated
                  now={fileProgress}
                  label={`${fileProgress}%`}
                />
              )}
            </Form>
          </div>
        </div>
    </>
  );
}

export default CreateBook;
