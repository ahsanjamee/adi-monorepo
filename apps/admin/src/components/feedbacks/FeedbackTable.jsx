import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

//internal import

import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import dayjs from "dayjs";
import { useState } from "react";
import MessageCell from "./MessageCell";

const FeedbackTable = ({
    data,
}) => {
    const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
    const { showingTranslateValue } = useUtilsFunction();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleMessage = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <DeleteModal id={serviceId} title={title} />

            <TableBody>
                {data?.map((item) => (
                    <TableRow key={item._id}>

                        <TableCell className="font-semibold uppercase text-xs">
                            {item?._id?.substring(20, 24)}
                        </TableCell>
                        <TableCell>
                            {item?.name}
                        </TableCell>
                        <TableCell className="text-sm">
                            {item?.email}
                        </TableCell>
                        <TableCell className="text-sm">
                            {item?.phone}
                        </TableCell>
                        <TableCell className="text-sm">
                            {item?.subject}
                        </TableCell>
                        <TableCell className="text-sm ">
                            <MessageCell message={item?.message} />
                        </TableCell>
                        <TableCell className="text-sm">
                            {dayjs(item?.createdAt).format('DD-MM-YYYY, HH:mm')}
                        </TableCell>


                        <TableCell>
                            <EditDeleteButton
                                id={item?._id}
                                parent={item}
                                isCheck={[]}
                                hideUpdateButton={true}
                                handleUpdate={handleUpdate}
                                handleModalOpen={handleModalOpen}
                                title={showingTranslateValue(item?.name)}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
};

export default FeedbackTable;
