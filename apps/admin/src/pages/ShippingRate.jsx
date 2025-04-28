import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

//internal import

import useAsync from "@/hooks/useAsync";
import { SidebarContext } from "@/context/SidebarContext";
import CategoryServices from "@/services/CategoryServices";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import useFilter from "@/hooks/useFilter";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import PageTitle from "@/components/Typography/PageTitle";
import MainDrawer from "@/components/drawer/MainDrawer";
import CategoryDrawer from "@/components/drawer/CategoryDrawer";
import UploadManyTwo from "@/components/common/UploadManyTwo";
import SwitchToggleChildCat from "@/components/form/switch/SwitchToggleChildCat";
import TableLoading from "@/components/preloader/TableLoading";
import CheckBox from "@/components/form/others/CheckBox";
import CategoryTable from "@/components/category/CategoryTable";
import NotFound from "@/components/table/NotFound";
import ShippingRateServices from "@/services/shippingRateServices";
import ShippingRateDrawer from "@/components/drawer/ShippingRateDrawer";
import ShippingRateTable from "@/components/shippingRate/ShippingRateTable";

const ShippingRate = () => {
  const resultsPerPage = 20;
  const { toggleDrawer, lang } = useContext(SidebarContext);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error } = useAsync(ShippingRateServices.getAllShippingRates);
  const { data: categoryData, loading: catLoading, error: catError } = useAsync(CategoryServices.getAllCategory);
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    setDataTable(
      data?.slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
      )
    );
  }, [data, currentPage]);

  const handleChangePage = (p) => {
    setCurrentPage(p);
  };

  const { allId, serviceId } =
    useToggleDrawer();

  const { t } = useTranslation();

  // react hooks
  const [isCheck, setIsCheck] = useState([]);
  const [showChild, setShowChild] = useState(false);

  return (
    <>
      <PageTitle>{t("Shipping Rates")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} />

      <MainDrawer>
        <ShippingRateDrawer id={serviceId} data={categoryData} lang={lang} />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody className="">
          {/* <div className="flex md:flex-row flex-col gap-3 justify-end items-end"> */}

          {/* </div> */}
          <div></div>

          <div className="flex justify-end w-full">

            <div className="w-full md:w-48 lg:w-48 xl:w-48">
              <Button
                onClick={toggleDrawer}
                className="rounded-md h-12 w-full"
              >
                <span className="mr-2">
                  <FiPlus />
                </span>

                Add Shipping Rate
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <CardBody>
          <form
            onSubmit={handleSubmitCategory}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={categoryRef}
                type="search"
                placeholder={t("SearchCategory")}
              />
            </div>
            <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <div className="w-full mx-1">
                <Button type="submit" className="h-12 w-full bg-emerald-700">
                  Filter
                </Button>
              </div>

              <div className="w-full mx-1">
                <Button
                  layout="outline"
                  onClick={handleResetField}
                  type="reset"
                  className="px-4 md:py-1 py-2 h-12 text-sm dark:bg-gray-700"
                >
                  <span className="text-black dark:text-gray-200">Reset</span>
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card> */}


      {loading || catLoading ? (
        <TableLoading row={12} col={6} width={190} height={20} />
      ) : error || catError ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : data?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{t("catIdTbl")}</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Base Charge</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Rate per kg</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell></TableCell>
              </tr>
            </TableHeader>

            <ShippingRateTable
              data={dataTable}
              lang={lang}
              isCheck={isCheck}
              categories={categoryData}
              setIsCheck={setIsCheck}
              showChild={showChild}
            />
          </Table>

          <TableFooter>
            <Pagination
              totalResults={data?.length}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no shipping rates right now." />
      )}
    </>
  );
};

export default ShippingRate;
