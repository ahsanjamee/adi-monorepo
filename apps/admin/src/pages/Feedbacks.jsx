import {
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader
} from "@windmill/react-ui";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

//internal import

import TableLoading from "@/components/preloader/TableLoading";
import ShippingRateTable from "@/components/shippingRate/ShippingRateTable";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import FeedbackServices from "@/services/FeedbackServices";
import FeedbackTable from "@/components/feedbacks/FeedbackTable";

const Feedbacks = () => {
  const { toggleDrawer, lang } = useContext(SidebarContext);

  const { data, loading, error } = useAsync(FeedbackServices.getAllFeedbacks);

  const { allId, serviceId } =
    useToggleDrawer();

  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [dataTable, setDataTable] = useState([]);
  const resultsPerPage = 20;

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

  return (
    <>
      <PageTitle>{t("Feedbacks from customers")}</PageTitle>

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


      {loading ? (
        <TableLoading row={12} col={6} width={190} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : data?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{t("catIdTbl")}</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Created</TableCell>
                <TableCell></TableCell>
              </tr>
            </TableHeader>
            {/* 
            <ShippingRateTable
              data={data}
              lang={lang}
              isCheck={isCheck}
              categories={categoryData}
              setIsCheck={setIsCheck}
              showChild={showChild}
            /> */}
            <FeedbackTable data={dataTable} />
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
        <NotFound title="" />
      )}
    </>
  );
};

export default Feedbacks;
