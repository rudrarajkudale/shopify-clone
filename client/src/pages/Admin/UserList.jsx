import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
    useDeleteUserMutation,
    useGetUsersQuery,
    useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import AdminMenu from "./AdminMenu";

const UserList = () => {

    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [updateUser] = useUpdateUserMutation();

    const [editableUserId, setEditableUserId] = useState(null);
    const [editableUserName, setEditableUserName] = useState("");
    const [editableUserEmail, setEditableUserEmail] = useState("");

    useEffect(() => {
        refetch();
    }, [refetch]);

    const deleteHandler = async (id) => {
        if (window.confirm(`Delete user with id ${id}`)) {
            try {
                await deleteUser(id);
                refetch();
            } catch (err) {
                console.log(err);
            }
        }
    };

    const toggleEdit = (id, username, email) => {
        setEditableUserId(id);
        setEditableUserName(username);
        setEditableUserEmail(email);
    };

    const updateHandler = async (id) => {
        try {
            await updateUser({
                userId: id,
                username: editableUserName,
                email: editableUserEmail,
            });
            setEditableUserId(null);
            refetch();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="p-4">
            <div className="h-12 m-3 text-center text-2xl">Manage Users</div>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <div className="flex flex-col md:flex-row">
                    <AdminMenu />
                    <table className="w-full md:w-4/5 mx-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-left border border-gray-300">ID</th>
                                <th className="px-4 py-2 text-left border border-gray-300">NAME</th>
                                <th className="px-4 py-2 text-left border border-gray-300">EMAIL</th>
                                <th className="px-4 py-2 text-left border border-gray-300">ADMIN</th>
                                <th className="px-4 py-2 border border-gray-300"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"
                                        } hover:bg-gray-200 transition-colors`}
                                >
                                    <td className="px-4 py-2 border border-gray-300">{user._id}</td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        {editableUserId === user._id && !user.isAdmin ? (
                                            <div className="flex items-center">
                                                <input
                                                    type="text"
                                                    value={editableUserName}
                                                    onChange={(e) => setEditableUserName(e.target.value)}
                                                    className="w-full p-2 border rounded-lg"
                                                />
                                                <button
                                                    onClick={() => updateHandler(user._id)}
                                                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                                                >
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                {user.username}{" "}
                                                <button
                                                    onClick={() => toggleEdit(user._id, user.username, user.email)}
                                                >
                                                    <FaEdit className="ml-[1rem]" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        {editableUserId === user._id && !user.isAdmin ? (
                                            <div className="flex items-center">
                                                <input
                                                    type="text"
                                                    value={editableUserEmail}
                                                    onChange={(e) => setEditableUserEmail(e.target.value)}
                                                    className="w-full p-2 border rounded-lg"
                                                />
                                                <button
                                                    onClick={() => updateHandler(user._id)}
                                                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                                                >
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                                                <button
                                                    onClick={() => toggleEdit(user._id, user.name, user.email)}
                                                >
                                                    <FaEdit className="ml-[1rem]" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        {user.isAdmin ? (
                                            <FaCheck style={{ color: "green" }} />
                                        ) : (
                                            <FaTimes style={{ color: "red" }} />
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        {!user.isAdmin && (
                                            <div className="flex">
                                                <button
                                                    onClick={() => deleteHandler(user._id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default UserList;
