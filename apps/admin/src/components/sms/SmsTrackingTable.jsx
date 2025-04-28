import React from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Badge,
} from "@windmill/react-ui";
import dayjs from "dayjs";

const SmsTrackingTable = ({ smsRecords }) => {
  return (
    <TableContainer className="mb-8">
      <Table>
        <TableHeader>
          <tr>
            <TableCell>Recipient</TableCell>
            <TableCell>Message Type</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
          </tr>
        </TableHeader>
        <TableBody>
          {smsRecords?.map((record) => (
            <TableRow key={record._id}>
              <TableCell>
                <span className="text-sm">{record.recipientNumber}</span>
              </TableCell>
              <TableCell>
                <Badge
                  type={
                    record.messageType === "OTP"
                      ? "primary"
                      : record.messageType.includes("CUSTOMER")
                        ? "success"
                        : "warning"
                  }
                >
                  {record.messageType.replace(/_/g, " ")}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm">{record.message}</span>
              </TableCell>
              <TableCell>
                <Badge type={record.status === "SUCCESS" ? "success" : "danger"}>
                  {record.status}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {dayjs(record.createdAt).format("MMM D, YYYY h:mm A")}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SmsTrackingTable;
