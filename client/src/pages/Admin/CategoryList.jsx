import { useEffect, useState } from "react";
import {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";

import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {

    const { data: categories, refetch } = useFetchCategoriesQuery();
    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updatingName, setUpdatingName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleCreateCategory = async (e) => {
        e.preventDefault();

        if (!name) {
            alert("Category name is required.");
            return;
        }

        try {
            const result = await createCategory({ name }).unwrap();
            if (result.error) {
                console.error(result.error);
            } else {
                setName("");
                refetch();
                console.log(result);
                console.log("Category created successfully.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();

        if (!updatingName) {
            alert("Category name is required.");
            return;
        }

        try {
            const result = await updateCategory({
                categoryId: selectedCategory._id,
                updatedCategory: {
                    name: updatingName,
                },
            }).unwrap();

            if (result.error) {
                console.error(result.error);
            } else {
                console.log("Category updated successfully.");
                refetch();
                setSelectedCategory(null);
                setUpdatingName("");
                setModalVisible(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteCategory = async () => {
        try {
            const result = await deleteCategory(selectedCategory._id).unwrap();

            if (result.error) {
                console.error(result.error);
            } else {
                console.log("Category deleted successfully.");
                refetch();
                setSelectedCategory(null);
                setModalVisible(false);
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="ml-[10rem] flex flex-col md:flex-row">
            <AdminMenu />
            <div className="md:w-3/4 p-3">
                <div className="h-12 m-3 text-2xl">Create Categories</div>
                <CategoryForm
                    value={name}
                    setValue={setName}
                    handleSubmit={handleCreateCategory}
                />
                <br />
                <hr />

                <div className="flex flex-wrap">
                    {categories?.map((category) => (
                        <div key={category._id}>
                            <button
                                className="bg-white border border-blue-500 text-blue-700 py-2 px-4 rounded-lg m-3 hover:bg-blue-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                onClick={() => {
                                    {
                                        setModalVisible(true);
                                        setSelectedCategory(category);
                                        setUpdatingName(category.name);
                                    }
                                }}
                            >
                                {category.name}
                            </button>
                        </div>
                    ))}
                </div>

                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                    <CategoryForm
                        value={updatingName}
                        setValue={(value) => setUpdatingName(value)}
                        handleSubmit={handleUpdateCategory}
                        buttonText="Update"
                        handleDelete={handleDeleteCategory}
                    />
                </Modal>
            </div>
        </div>
    )
}

export default CategoryList;
