import React, { useEffect, useState } from "react";
import { Card, Col, Row, Breadcrumb } from "antd"
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
function Dashboard() {
  const [bestsellingProduct, SetBestSellingProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [Loaded, SetLoaded] = useState(false);
  
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };
  return (
    <>

      <section>
        <div className="bg-white flex justify-between items-center py-3 rounded-md ">
          <div>
            <h3 className="xl:px-8 xl:text-3xl font-bold mb-1" >Ecomerce</h3>
            <p className="xl:px-8" >Whole data about your business here</p>
          </div>
          <div className="xl:px-12">
            <Breadcrumb>
              <Breadcrumb.Item  className="cursor-pointer">
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item className="cursor-pointer">
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item className="cursor-pointer">
                Ecomerce
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="my-5">
          <Row gutter={12}>
            <Col span={6}>
              <Card bordered={false} style={{
                borderRadius: "12px"
              }} >
                <div className="flex justify-between items-center xl:flex-row flex-col md:flex-row sm:flex-row">
                  <div className="mr-2">
                    <span className=" flex items-center justify-center text-[22px] w-12 h-12 text-white
                      bg-[#08817833] rounded-full" >
                      <span className="bg-[#109188cc] rounded-full text-[16px] p-[6px] flex justify-center items-center" >
                        <iconify-icon icon="nimbus:money" ></iconify-icon>
                      </span>
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[#383e50] font-bold xl:ml-1 ml-0" >Total Sales</h3>
                    <h3 className="text-slate-900 font-bold text-lg">Rs12900,000</h3>
                    <p className="text-xs">
                      Shipping fees are  included
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false} style={{
                borderRadius: "12px"
              }} >
                <div className="flex justify-between items-center xl:flex-row flex-col md:flex-row sm:flex-row">
                  <div className="mr-2">
                    <span className="flex items-center justify-center text-[22px] w-12 h-12 text-white bg-[#00b51733] rounded-full" >
                      <iconify-icon icon="mdi:truck" style={{
                        color: "green"
                      }}  ></iconify-icon> </span>
                  </div>
                  <div>
                    <h3 className="text-[#383e50] font-bold xl:ml-1 ml-0" > Total Orders
                    </h3>
                    <h3 className="text-slate-900 font-bold text-lg">53.668</h3>
                    <p className="text-xs">
                      Shipping fees are  included
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false} style={{
                borderRadius: "12px"
              }} >
                <div className="flex justify-evenly items-center xl:flex-row flex-col md:flex-row sm:flex-row">
                  <div className="mr-2">
                    <span className="flex items-center justify-center text-[22px] w-12 h-12 text-white bg-[#fd8a1433]
                     rounded-full" >
                      <iconify-icon icon="line-md:grid-3" style={{
                        color: "#FD8B14"
                      }}></iconify-icon>
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[#383e50] font-bold" >Total Products</h3>
                    <h3 className="text-slate-900 font-bold text-lg">44.55</h3>
                    <p className="text-xs">
                      In 12 Categories
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false} style={{
                borderRadius: "12px"
              }} >
                <div className="flex justify-evenly items-center xl:flex-row flex-col md:flex-row sm:flex-row">
                  <div className="mr-2">
                    <span className="flex items-center justify-center text-[22px] w-12 h-12 text-white bg-green-500 rounded-full" >
                      <iconify-icon icon="fa6-solid:users"></iconify-icon> </span>
                  </div>
                  <div>
                    <h3 className="text-[#383e50] font-bold" >Total users</h3>
                    <h3 className="text-slate-900 font-bold text-lg">6</h3>
                    <p className="text-xs">
                      All user verifed
                    </p>
                  </div>
                </div>
              </Card>
            </Col>

          </Row>
        </div>

        
        {/* Best selling */}
        <div className="bg-white xl:py-[22px] rounded  py-[10px] px-[22px] my-5">
        <h4 className="text-[22px] font-bold mb-4 ">Latest Order</h4>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">PRODUCT</TableCell>
                <TableCell align="center">CATEGORY</TableCell>
                <TableCell align="center">PRICE</TableCell>
                <TableCell align="center">STOCK</TableCell>
                <TableCell align="center">Orders</TableCell>
                <TableCell align="center">Sales</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {Array.isArray(allcategorys) &&
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
                  ))} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3,5,9]}
          component="div"
          count={4}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        ></TablePagination>
      </div>
    

      </section>
    </>
  );
}

export default Dashboard;
