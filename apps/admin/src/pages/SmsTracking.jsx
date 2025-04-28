import React, { useEffect, useState, useCallback } from "react";
import { Card, CardBody, Pagination, Select, Input, Label } from "@windmill/react-ui";
import {
  FiPhone,
  FiCheckCircle,
  FiAlertCircle,
  FiCalendar,
} from "react-icons/fi";
import dayjs from "dayjs";
import SmsTrackingService from "../services/SmsTrackingService";
import SmsTrackingTable from "../components/sms/SmsTrackingTable";
import PageTitle from "../components/Typography/PageTitle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StatCard = ({ title, value, icon, type }) => (
  <Card className="flex items-center">
    <CardBody className="flex items-center">
      <div className={`p-3 rounded-full mr-4 text-${type}-500 bg-${type}-100 dark:text-${type}-100 dark:bg-${type}-500`}>
        {icon}
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </p>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {value}
        </p>
      </div>
    </CardBody>
  </Card>
);

const DATE_RANGES = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'This Week', value: 'thisWeek' },
  { label: 'This Month', value: 'thisMonth' },
  { label: 'Last Month', value: 'lastMonth' },
  { label: 'Last 7 Days', value: 'last7Days' },
  { label: 'Last 30 Days', value: 'last30Days' },
  { label: 'Custom Range', value: 'custom' },
];

const SmsTracking = () => {
  const [loading, setLoading] = useState(true);
  const [smsRecords, setSmsRecords] = useState([]);
  const [statistics, setStatistics] = useState({
    totalCount: 0,
    todayCount: 0,
    statistics: [],
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  });
  const [dateRange, setDateRange] = useState('today');
  const [dateFilter, setDateFilter] = useState(SmsTrackingService.getDateRanges().today);
  const [customDates, setCustomDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const fetchSmsRecords = useCallback(async (page) => {
    try {
      const response = await SmsTrackingService.getAllSmsRecords({
        page,
        limit: pagination.limit,
        startDate: dateFilter.startDate,
        endDate: dateFilter.endDate,
      });
      setSmsRecords(response.data);
      setPagination({
        currentPage: response.pagination.currentPage,
        totalPages: response.pagination.totalPages,
        limit: response.pagination.limit,
      });
    } catch (error) {
      console.error("Error fetching SMS records:", error);
    }
  }, [pagination.limit, dateFilter]);

  const fetchStatistics = useCallback(async () => {
    try {
      const response = await SmsTrackingService.getSmsStatistics({
        startDate: dateFilter.startDate,
        endDate: dateFilter.endDate,
      });
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching SMS statistics:", error);
    }
  }, [dateFilter]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchSmsRecords(pagination.currentPage),
        fetchStatistics(),
      ]);
      setLoading(false);
    };
    fetchData();
  }, [dateFilter, fetchSmsRecords, fetchStatistics, pagination.currentPage]);

  const handlePageChange = (page) => {
    fetchSmsRecords(page);
  };

  const handleDateRangeChange = (e) => {
    const selectedRange = e.target.value;
    setDateRange(selectedRange);

    if (selectedRange === 'custom') {
      setDateFilter({
        startDate: dayjs(customDates.startDate).startOf('day').toISOString(),
        endDate: dayjs(customDates.endDate).endOf('day').toISOString(),
      });
    } else {
      setDateFilter(SmsTrackingService.getDateRanges()[selectedRange]);
    }
  };

  const handleCustomDateChange = (dates) => {
    const [start, end] = dates;
    setCustomDates({
      startDate: start,
      endDate: end,
    });

    if (start && end) {
      setDateFilter({
        startDate: dayjs(start).startOf('day').toISOString(),
        endDate: dayjs(end).endOf('day').toISOString(),
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const successCount =
    statistics.statistics.find((stat) => stat._id.status === "SUCCESS")
      ?.count || 0;

  const failedCount =
    statistics.statistics.find((stat) => stat._id.status === "FAILED")?.count ||
    0;

  return (
    <>
      <PageTitle>SMS Tracking</PageTitle>

      <div className="flex flex-col md:flex-row justify-end items-end gap-4 mb-6">
        <div className="w-full md:w-48">
          <Select
            className="mt-1"
            value={dateRange}
            onChange={handleDateRangeChange}
          >
            {DATE_RANGES.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </Select>
        </div>

        {dateRange === 'custom' && (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-84">
              <DatePicker
                selected={customDates.startDate}
                onChange={handleCustomDateChange}
                startDate={customDates.startDate}
                endDate={customDates.endDate}
                selectsRange
                className="w-full h-12 mt-1 px-2 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-emerald-500"
                dateFormat="MMM d, yyyy"
                maxDate={new Date()}

              />
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-1 xl:grid-cols-1">
        <StatCard
          title="TOTAL SMS"
          value={statistics.totalCount}
          icon={<FiPhone className="w-5 h-5" />}
          type="primary"
        />
        {/* <StatCard
          title={`${DATE_RANGES.find(r => r.value === dateRange)?.label.toUpperCase()} COUNT`}
          value={statistics.todayCount}
          icon={<FiCalendar className="w-5 h-5" />}
          type="warning"
        /> */}
      </div>

      <Card className="mb-8 shadow-md">
        <CardBody>
          <SmsTrackingTable smsRecords={smsRecords} />
          <div className="flex justify-center mt-6">
            <Pagination
              totalResults={pagination.totalPages * pagination.limit}
              resultsPerPage={pagination.limit}
              onChange={handlePageChange}
              label="Table navigation"
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default SmsTracking;