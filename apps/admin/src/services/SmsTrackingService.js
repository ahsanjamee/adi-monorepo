import requests from "./httpService";
import dayjs from "dayjs";

const SmsTrackingService = {
  getAllSmsRecords: async ({
    page = 1,
    limit = 10,
    startDate = dayjs().startOf("day").toISOString(),
    endDate = dayjs().endOf("day").toISOString(),
  }) => {
    const response = await requests.get(
      `/sms/records?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`
    );
    return response;
  },

  getSmsStatistics: async ({
    startDate = dayjs().startOf("day").toISOString(),
    endDate = dayjs().endOf("day").toISOString(),
  } = {}) => {
    const response = await requests.get(
      `/sms/statistics?startDate=${startDate}&endDate=${endDate}`
    );
    return response;
  },

  // Helper function to get date ranges
  getDateRanges: () => {
    return {
      today: {
        startDate: dayjs().startOf("day").toISOString(),
        endDate: dayjs().endOf("day").toISOString(),
      },
      yesterday: {
        startDate: dayjs().subtract(1, "day").startOf("day").toISOString(),
        endDate: dayjs().subtract(1, "day").endOf("day").toISOString(),
      },
      thisWeek: {
        startDate: dayjs().startOf("week").toISOString(),
        endDate: dayjs().endOf("week").toISOString(),
      },
      thisMonth: {
        startDate: dayjs().startOf("month").toISOString(),
        endDate: dayjs().endOf("month").toISOString(),
      },
      lastMonth: {
        startDate: dayjs().subtract(1, "month").startOf("month").toISOString(),
        endDate: dayjs().subtract(1, "month").endOf("month").toISOString(),
      },
      last7Days: {
        startDate: dayjs().subtract(7, "day").startOf("day").toISOString(),
        endDate: dayjs().endOf("day").toISOString(),
      },
      last30Days: {
        startDate: dayjs().subtract(30, "day").startOf("day").toISOString(),
        endDate: dayjs().endOf("day").toISOString(),
      },
      custom: {
        startDate: null,
        endDate: null,
      },
    };
  },

  // Helper function to format date for display
  formatDate: (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  },
};

export default SmsTrackingService;
