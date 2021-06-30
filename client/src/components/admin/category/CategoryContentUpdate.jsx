import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { fetchOneCategory } from "../../../redux/admin/category/adminCategoryAction";
import Loading from "../../moleculs/spinner/Spinner";
import style from "../user/styles.css";

const CategoryContentUpdate = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { category, isLoading } = useSelector((state) => state.adminCategory);
  const categoryID = location.pathname.substr(
    location.pathname.lastIndexOf("/") + 1
  );

  useEffect(() => {
    dispatch(fetchOneCategory(categoryID));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-3" id="page-content-wrapper">
          <div className="col-sm-4 d-flex justify-content-center mx-auto">
            <Table responsive="sm">
              {category && (
                <tbody>
                  <tr>
                    <th>ID</th>
                    <td>{category.data.id}</td>
                  </tr>
                  <tr>
                    <th>Category Name</th>
                    <td>{category.data.category_name}</td>
                  </tr>
                </tbody>
              )}
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryContentUpdate;
