import { Input } from "@windmill/react-ui";

import Tree from "rc-tree";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

//internal import
import DrawerButton from "@/components/form/button/DrawerButton";
import InputArea from "@/components/form/input/InputArea";
import TextAreaCom from "@/components/form/input/TextAreaCom";
import Error from "@/components/form/others/Error";
import Title from "@/components/form/others/Title";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import Uploader from "@/components/image-uploader/Uploader";
import useShippingRateSubmit from "@/hooks/useShippingRateSubmit";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import CategoryServices from "@/services/CategoryServices";
import { notifyError } from "@/utils/toast";

const ShippingRateDrawer = ({ id, data }) => {
    const { t } = useTranslation();

    const {
        checked,
        register,
        onSubmit,
        handleSubmit,
        errors,
        imageUrl,
        setImageUrl,
        published,
        setPublished,
        setChecked,
        selectCategoryName,
        setSelectCategoryName,
        handleSelectLanguage,
        isSubmitting,
    } = useShippingRateSubmit(id, data);

    const { showingTranslateValue } = useUtilsFunction();

    const STYLE = `
  .rc-tree-child-tree {
    display: hidden;
  }
  .node-motion {
    transition: all .3s;
    overflow-y: hidden;
  }
`;

    const motion = {
        motionName: "node-motion",
        motionAppear: false,
        onAppearStart: (node) => {
            return { height: 0 };
        },
        onAppearActive: (node) => ({ height: node.scrollHeight }),
        onLeaveStart: (node) => ({ height: node.offsetHeight }),
        onLeaveActive: () => ({ height: 0 }),
    };

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push({
                title: showingTranslateValue(category.name),
                key: category._id,
                children:
                    category.children.length > 0 && renderCategories(category.children),
            });
        }

        return myCategories;
    };

    const findObject = (obj, target) => {
        return obj._id === target
            ? obj
            : obj?.children?.reduce(
                (acc, obj) => acc ?? findObject(obj, target),
                undefined
            );
    };

    const handleSelect = async (key) => {
        // console.log('key', key, 'id', id);
        if (key === undefined) return;
        if (id) {
            const parentCategoryId = await CategoryServices.getCategoryById(key);

            if (id === key) {
                return notifyError("This can't be select as a parent category!");
            } else if (id === parentCategoryId.parentId) {
                return notifyError("This can't be select as a parent category!");
            } else {
                if (key === undefined) return;
                setChecked(key);

                const obj = data[0];
                const result = findObject(obj, key);

                setSelectCategoryName(showingTranslateValue(result?.name));
            }
        } else {
            if (key === undefined) return;
            setChecked(key);

            const obj = data[0];
            const result = findObject(obj, key);

            setSelectCategoryName(showingTranslateValue(result?.name));
        }
    };

    return (
        <>
            <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {id ? (
                    <Title
                        register={register}
                        handleSelectLanguage={handleSelectLanguage}
                        title={'Update Shipping Rate'}
                        description={'Update Shipping Rate'}
                    />
                ) : (
                    <Title
                        register={register}
                        handleSelectLanguage={handleSelectLanguage}
                        title={'Add Shipping Rate'}
                        description={'Add Shipping Rate'}
                    />
                )}
            </div>

            <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={'Weight'} />
                            <div className="col-span-8 sm:col-span-4">
                                <InputArea
                                    register={register}
                                    label="Weight in KG"
                                    name="weight"
                                    type="text"
                                    placeholder={"Weight in KG"}
                                />
                                <Error errorName={errors.weight} />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={'Base charge'} />
                            <div className="col-span-8 sm:col-span-4">
                                <InputArea
                                    register={register}
                                    label="Base charge"
                                    name="baseCharge"
                                    type="text"
                                    required={false}
                                    placeholder={"Base charge"}
                                />
                                <Error errorName={errors.baseCharge} />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={'Rate per kg'} />
                            <div className="col-span-8 sm:col-span-4">
                                <InputArea
                                    register={register}
                                    label="Rate per kg"
                                    name="ratePerKg"
                                    type="text"
                                    placeholder={"Rate per kg"}
                                />
                                <Error errorName={errors.ratePerKg} />
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={'City'} />

                            <div className="col-span-8 sm:col-span-4">
                                <div className="flex space-x-6">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            value="inside_dhaka"
                                            className="form-radio h-5 w-5 text-white transition duration-150 ease-in-out"
                                            {...register("city", { required: "City is required" })}
                                        />
                                        <span className="dark:text-white">Inside Dhaka</span>
                                    </label>

                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            value="outside_dhaka"
                                            className="form-radio h-5 w-5 text-white transition duration-150 ease-in-out"
                                            {...register("city", { required: "City is required" })}
                                        />
                                        <span className="dark:text-white">Outside Dhaka</span>
                                    </label>
                                </div>

                                {errors.city && (
                                    <p className="mt-2 text-sm text-red-400">
                                        {errors.city.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                            <LabelArea label={'Category'} />
                            <div className="col-span-8 sm:col-span-4 relative">
                                <Input
                                    readOnly
                                    {...register(`parent`, {
                                        required: false,
                                    })}
                                    name="parent"
                                    value={selectCategoryName ? selectCategoryName : "Home"}
                                    placeholder={'Category'}
                                    type="text"
                                />

                                <div className="draggable-demo capitalize">
                                    <style dangerouslySetInnerHTML={{ __html: STYLE }} />
                                    <Tree
                                        expandAction="click"
                                        treeData={renderCategories(data)}
                                        selectedKeys={[checked]}
                                        onSelect={(v) => handleSelect(v[0])}
                                        motion={motion}
                                        animation="slide-up"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <DrawerButton id={id} title="Shipping Rate" isSubmitting={isSubmitting} />
                </form>
            </Scrollbars>
        </>
    );
};

export default ShippingRateDrawer;
