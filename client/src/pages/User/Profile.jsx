import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";

import Field from "../formElements/Field";
import Fieldset from "../formElements/Fieldset";

const Profile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            username: userInfo.username,
            email: userInfo.email,
        }
    });

    const formSubmit = async (formData) => {

        const { username, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setError("confirmPassword", { message: "Passwords do not match" });
        } else {

            try {
                const res = await updateProfile({ _id: userInfo._id, username, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate("/profile");
                console.log("User successfully updated");
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (

        <div className="flex justify-center items-center h-lvh" >
            <div className="border-t-8 rounded-sm border-indigo-400 bg-white p-12 shadow-2xl w-full max-w-4xl">
                <h1 className="font-bold text-2xl">Update your details</h1>
                <form onSubmit={handleSubmit(formSubmit)} className="flex flex-wrap -mx-4 mb-6">
                    {/* User Details */}
                    <div className="flex m-4 gap-8">
                        <Fieldset className="w-full md:w-1/2 px-4 mb-6">
                            <Field label="Username" error={errors.username}>
                                <input
                                    {...register("username", { required: "Username is required" })}
                                    className={`focus:outline-indigo-400 p-2 border box-border w-full rounded-md ${errors.username ? "border-red-500" : "border-gray-400"
                                        }`}
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Example Name"
                                />
                            </Field>
                            <Field label="Email" error={errors.email}>
                                <input
                                    {...register("email", { required: "Email is required" })}
                                    className={`focus:outline-indigo-400 p-2 border box-border w-full rounded-md ${errors.email ? "border-red-500" : "border-gray-400"
                                        }`}
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="example@email.com"
                                />
                            </Field>
                        </Fieldset>
                        <Fieldset className="w-full md:w-1/2 px-4 mb-6">
                            <Field label="Password" error={errors.password}>
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                                    })}
                                    className={`focus:outline-indigo-400 invalid:border-indigo-500 invalid:text-indigo-600 focus:invalid:border-indigo-500 p-2 border box-border w-full rounded-md ${errors.password ? "border-red-500" : "border-gray-400"
                                        }`}
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter Password"
                                />
                            </Field>
                            <Field label="Confirm Password" error={errors.confirmPassword}>
                                <input
                                    {...register("confirmPassword")}
                                    className={`focus:outline-indigo-400 p-2 border box-border w-full rounded-md ${errors.confirmPassword ? "border-red-500" : "border-gray-400"
                                        }`}
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Re-enter Password"
                                />
                            </Field>
                        </Fieldset>
                    </div>
                    <div className="w-full px-4">
                        <button className="p-2 mt-6 bg-green-500 hover:bg-green-600 text-white rounded-md w-full cursor-pointer">
                            {loadingUpdateProfile ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                    {loadingUpdateProfile && <Loader />}
                </form>
                <NavLink className="text-gray-900 block" to="/user-orders">Review your Orders. <span className="underline text-blue-400">My Orders</span></NavLink>
            </div>
        </div >
    );
}

export default Profile;
