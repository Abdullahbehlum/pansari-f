import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  TablePagination,
} from "@mui/material";
import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseUrl } from "../../utils/BaseUrl.js"

function AllCategory() {
  const [allcategorys, SetAllCategory] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [Loaded, SetLoaded] = useState(false);
  const handleAllCategories = async () => {
    try {
      const { data: res } = await axios.get(`${BaseUrl}/api/v1/category/allcategories`);
      const showAllCategories = res.Allcategory;
      SetAllCategory(showAllCategories);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  useEffect(() => {
    if (!Loaded) {
      handleAllCategories();
    }
  }, []);

  const handleDeleteCategory = async (id) => {
    try {
      const { data: res } = await axios.delete(
        `/api/v1/category/deleteCategory/${id}`
      );
      SetAllCategory((precategory) => precategory.filter((c) => c._id !== id));
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white xl:py-[22px] rounded  py-[10px] px-[22px]">
        <h4 className="text-[22px] font-bold mb-4 ">All Categories</h4>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Category Image</TableCell>
                <TableCell align="center">Category Name</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(allcategorys) &&
                allcategorys
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((c, i) => (
                    <>
                      <TableRow key={i}>
                        <TableCell align="center">
                          <div className="flex flex-col justify-center items-center">
                            <img
                              src={`/public/${c.Categoryimage}`}
                              alt={c.Categoryname}
                              className="w-[80px] object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell align="center">{c.Categoryname}</TableCell>
                        <TableCell align="center">
                          <div className="flex justify-center items-center">
                            <div className="mx-1">
                              <Button
                                onClick={() => handleDeleteCategory(c._id)}
                              >
                                <DeleteOutlined />
                              </Button>
                            </div>

                            <div className="mx-1">
                              <Button
                                onClick={() => {
                                  navigate(`/admin/add-category/${c._id}`);
                                }}
                              >
                                <EditOutlined />
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3, 5, 9]}
          component="div"
          count={allcategorys.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        ></TablePagination>
      </div>
    </>
  );
}

export default AllCategory;
