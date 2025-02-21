import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";

import Field from "../formElements/Field";
import Fieldset from "../formElements/Fieldset";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, setError } = useForm();

    const [login, { isLoading }] = useLoginMutation();
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
        console.log(formData);
        const { email, password } = formData;

        try {
            const res = await login({ email, password }).unwrap();
            console.log(res);

            if (res) {
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
                console.log("User logged in");
            } else {
                console.log("Invalid email or password");
            }
        } catch (error) {
            setError("root", { message: "Invalid email or password" });
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-lvh">
            <div className=" border-t-8 rounded-sm border-blue-400 bg-white p-12 shadow-2xl w-96">
                <h1 className="font-bold text-center block text-2xl">Welcome Back</h1>
                <form onSubmit={handleSubmit(formSubmit)} className="mb-4">
                    <Fieldset label="Enter login details">
                        <Field label="Email" error={errors.email}>
                            <input {...register("email", { required: "Email is required" })}
                                className={`focus:outline-blue-400 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 p-2 border box-border w-[300px] rounded-md ${errors.email ? "border-red-500" : "border-gray-400"}`}
                                type="email" name="email" id="email" placeholder="example@email.com" />
                        </Field>

                        <Field label="Password" error={errors.password}>
                            <input {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: `Password must be at least 6 characters` },
                            })}
                                className={`focus:outline-blue-400 p-2 border box-border w-[300px] rounded-md ${errors.password ? "border-red-500" : "border-gray-400"}`}
                                type="password" name="password" id="password" placeholder="Enter Password" />
                        </Field>
                    </Fieldset>
                    <div className="m-2 text-red-500 font-medium">{errors?.root?.message}</div>
                    <Field>
                        <button className="mt-4 p-2 bg-blue-500 hover:bg-blue-400 text-white rounded-md w-[300px] cursor-pointer">
                            {isLoading ? "Signing In..." : "Sign In"}
                        </button>
                    </Field>
                    {isLoading && <Loader />}
                </form>

                <NavLink className="text-gray-900 mt-4 block" to="/register">Don&apos;t have an account? <span className="underline text-indigo-500">Sign up</span></NavLink>
                <NavLink className="text-gray-900 block" to="/reset">Forgot Password? <span className="underline text-yellow-600">Reset your password</span></NavLink>
            </div>
        </div >
    )
}

export default Login;
