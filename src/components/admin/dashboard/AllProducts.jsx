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
import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseUrl } from "../../utils/BaseUrl.js"
function AllProducts() {
  const [AllProducts, SetAllProducts] = useState([]);
  const [Loaded, SetLoaded] = useState(false);
  const [DeleteProduct, SetDeleteProduct] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const navigate = useNavigate();
  const handleAllProducts = async () => {
    try {
      const { data: res } = await axios.get(`${BaseUrl}/api/v1/products/allproduct`);
      const showAllProduct = res.allproducts;
      SetAllProducts(showAllProduct);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!Loaded) {
      handleAllProducts();
    }
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      const { data: res } = await axios.delete(
        `${BaseUrl}/api/v1/products/deleteproduct/${id}`
      );
      SetDeleteProduct((prevproducts) =>
        prevproducts.filter((c) => c._id !== id)
      );
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="bg-white xl:py-[22px] rounded  py-[10px] px-[22px]">
        <h4 className="text-[22px] font-bold mb-4 ">All Products</h4>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Product Image</TableCell>
                <TableCell align="center">Product price</TableCell>
                <TableCell align="center">Product Inventory</TableCell>
                <TableCell align="center">Product Category</TableCell>
                <TableCell align="center">Product Sales</TableCell>

                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(AllProducts) &&
                AllProducts.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((p, i) => (
                  <>
                    <TableRow key={i}>
                      <TableCell align="center">
                        <div className="flex flex-col justify-center items-center">
                          <img
                            src={`/${p.image}`}
                            alt={p.name}
                            className="w-[80px] object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell align="center">{p.price}</TableCell>
                      <TableCell align="center">
                        {p.iventoryCount ? (
                          <>
                            <span className="bg-green-400 text-white py-[4px] px-[12px] rounded-sm">
                              {"In Stock"}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="bg-red-400 text-white py-[4px] px-[12px] rounded-sm">
                              {"Out of Stock"}
                            </span>
                          </>
                        )}
                      </TableCell>
                      <TableCell align="center">{p.category}</TableCell>
                      <TableCell align="center">{p.sold}</TableCell>

                      <TableCell align="center">
                        <div className="flex justify-center items-center">
                          <div className="mx-1">
                            <Button onClick={() => handleDeleteProduct(p._id)}>
                              <DeleteOutlined />
                            </Button>
                          </div>

                          <div className="mx-1">
                            <Button
                              onClick={() =>
                                navigate(`/admin/edit-product/${p._id}`)
                              }
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
          count={AllProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        ></TablePagination>
      </div>
    </>
  );
}

export default AllProducts;
