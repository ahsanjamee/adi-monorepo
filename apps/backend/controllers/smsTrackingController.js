const SmsTracking = require("../models/SmsTracking");

// Get all SMS records with pagination
const getAllSmsRecords = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const startDate = req.query.startDate
      ? new Date(req.query.startDate)
      : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

    // Build query with date range if provided
    const query = {};
    if (startDate && endDate) {
      query.createdAt = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const smsRecords = await SmsTracking.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await SmsTracking.countDocuments(query);

    res.status(200).json({
      success: true,
      data: smsRecords,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching SMS records",
      error: error.message,
    });
  }
};

// Get SMS statistics
const getSmsStatistics = async (req, res) => {
  try {
    const startDate = req.query.startDate
      ? new Date(req.query.startDate)
      : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

    // Build query with date range if provided
    const query = {};
    if (startDate && endDate) {
      query.createdAt = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const stats = await SmsTracking.aggregate([
      { $match: query },
      {
        $group: {
          _id: {
            messageType: "$messageType",
            status: "$status",
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const totalCount = await SmsTracking.countDocuments(query);
    const todayCount = await SmsTracking.countDocuments({
      ...query,
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        ...(endDate ? { $lte: endDate } : {}),
      },
    });

    res.status(200).json({
      success: true,
      data: {
        statistics: stats,
        totalCount,
        todayCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching SMS statistics",
      error: error.message,
    });
  }
};

module.exports = {
  getAllSmsRecords,
  getSmsStatistics,
};
