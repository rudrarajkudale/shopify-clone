import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

import Field from "../formElements/Field";
import Fieldset from "../formElements/Fieldset";

const Reset = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const formSubmit = async (formData) => {
        console.log(formData);
        const { email } = formData;

        try {
            //TODO - send reset link to email
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-lvh">
            <div className=" border-t-8 rounded-sm border-yellow-400 bg-white p-12 shadow-2xl w-96">
                <h1 className="font-bold text-center block text-2xl">Reset your password</h1>
                <form onSubmit={handleSubmit(formSubmit)} className="mb-4">
                    <Fieldset>
                        <Field label="Email" error={errors.email}>
                            <input {...register("email", { required: "Email is required" })}
                                className={`focus:outline-yellow-400 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 p-2 border box-border w-[300px] rounded-md ${errors.email ? "border-red-500" : "border-gray-400"}`}
                                type="email" name="email" id="email" placeholder="example@email.com" />
                        </Field>
                    </Fieldset>
                    <div className="m-2 text-red-500 font-medium">{errors?.root?.message}</div>
                    <Field>
                        <button className="p-2 mt-4 bg-yellow-600 text-white rounded-md w-[300px] cursor-pointer">Send Link</button>
                    </Field>
                </form>
                <NavLink className="text-gray-900 block" to="/register">Don&apos;t have an account? <span className="underline text-indigo-500">Sign up</span></NavLink>
            </div>
        </div>
    )
}

export default Reset;
