import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

//internal import

import MainDrawer from "@/components/drawer/MainDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import ShippingRateDrawer from "../drawer/ShippingRateDrawer";

const findCategoryById = (category, id) => {
    // Check if the current category matches the id
    if (category._id === id) {
        return category.name.en;
    }

    // If the current category has children, recursively search in the children
    if (category.children && category.children.length > 0) {
        for (let child of category.children) {
            const result = findCategoryById(child, id); // Recursive call
            if (result) {
                return result;
            }
        }
    }

    // If no match is found, return null
    return null;
};

const ShippingRateTable = ({
    data,
    lang,
    isCheck,
    categories,
    setIsCheck,
    useParamId,
    showChild,
}) => {
    const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
    const { showingTranslateValue } = useUtilsFunction();

    const handleClick = (e) => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id));
        }
    };

    return (
        <>
            {isCheck?.length < 1 && (
                <DeleteModal id={serviceId} title={title} />
            )}

            <MainDrawer>
                <ShippingRateDrawer id={serviceId} data={categories} />
            </MainDrawer>

            <TableBody>
                {data?.map((item) => (
                    <TableRow key={item._id}>

                        <TableCell className="font-semibold uppercase text-xs">
                            {item?._id?.substring(20, 24)}
                        </TableCell>
                        <TableCell>
                            {findCategoryById(categories[0], item?.categoryId) || 'Home'}
                        </TableCell>
                        <TableCell className="text-sm">
                            {item?.baseCharge}
                        </TableCell>
                        <TableCell className="text-sm">
                            {item?.city === 'inside_dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'}
                        </TableCell>
                        <TableCell className="text-sm">
                            {item?.ratePerKg}
                        </TableCell>
                        <TableCell className="text-sm">
                            {item?.weight}
                        </TableCell>


                        <TableCell>
                            <EditDeleteButton
                                id={item?._id}
                                parent={item}
                                isCheck={isCheck}
                                children={item?.children}
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

export default ShippingRateTable;
