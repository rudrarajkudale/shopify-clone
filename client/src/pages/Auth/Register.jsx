import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterUserMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";


import Field from "../formElements/Field";
import Fieldset from "../formElements/Fieldset";

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, setError } = useForm();

    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const formSubmit = async (formData) => {
        // console.log(formData);
        const { username, email, password, confirmPassword } = formData;

        // console.log(password === confirmPassword);

        if (password !== confirmPassword) {
            setError("confirmPassword", { message: "Passwords do not match" });
        } else {

            try {
                const res = await registerUser({ username, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
                console.log("User successfully registered");
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-lvh">
            <div className=" border-t-8 rounded-sm border-indigo-400 bg-white p-12 shadow-2xl w-96">
                <h1 className="font-bold text-center block text-2xl">Create your Account</h1>
                <form onSubmit={handleSubmit(formSubmit)} className="mb-4">
                    {/* User Details */}
                    <Fieldset label="Enter personal details">

                        <Field label="Username" error={errors.username}>
                            <input {...register("username", { required: "Username is required" })}
                                className={`focus:outline-indigo-400 p-2 border box-border w-[300px] rounded-md ${errors.username ? "border-red-500" : "border-gray-400"}`}
                                type="text" name="username" id="username" placeholder="Example Name" />
                        </Field>

                        <Field label="Email" error={errors.email}>
                            <input {...register("email", { required: "Email is required" })}
                                className={`focus:outline-indigo-400 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 p-2 border box-border w-[300px] rounded-md ${errors.email ? "border-red-500" : "border-gray-400"}`}
                                type="email" name="email" id="email" placeholder="example@email.com" />
                        </Field>

                        <Field label="Password" error={errors.password}>
                            <input {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters" },
                            })}
                                className={`focus:outline-indigo-400 p-2 border box-border w-[300px] rounded-md ${errors.password ? "border-red-500" : "border-gray-400"}`}
                                type="password" name="password" id="password" placeholder="Enter Password" />
                        </Field>

                        <Field label="Confirm Password" error={errors.confirmPassword}>
                            <input {...register("confirmPassword")}
                                className={`focus:outline-indigo-400 p-2 border box-border w-[300px] rounded-md ${errors.confirmPassword ? "border-red-500" : "border-gray-400"}`}
                                type="password" name="confirmPassword" id="confirmPassword" placeholder="Re-enter Password" />
                        </Field>

                    </Fieldset>

                    <Field>
                        <button className="p-2 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md w-[300px] cursor-pointer">
                            {isLoading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </Field>

                    {isLoading && <Loader />}
                </form>
                <NavLink className="text-gray-900 block" to="/login">Already have an account? <span className="underline text-indigo-500">Sign in</span></NavLink>
            </div>
        </div >
    )
}


export default Register;
