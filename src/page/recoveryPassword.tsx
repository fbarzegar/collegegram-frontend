import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { sendEmailValidation } from "../utils/validations";
import SendEmail from "../logic/sendEmail";

import Button from "../component/button";
import Input from "../component/input";

import gmail from "../assets/icons/gmail.svg";

export default function RecoveryPassword() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { usernameOrEmail: "" },
    enableReinitialize: true,
    validationSchema: sendEmailValidation,
    onSubmit: SendEmail(),
  });

  return (
    <div className="flex min-h-[330px] column mt-6 justify-center text-center">
      <form onSubmit={formik.handleSubmit}>
        <p className={"mx-2 text-gray-700"}>بازیابی رمز عبور </p>

        <div className="mt-12 mb-8">
          <Input
            placeholder="ایمیل"
            postfix={
              <img src={gmail} alt="key" className="absolute mt-3 px-2" />
            }
            value={formik.values?.usernameOrEmail}
            onChange={(e: any) =>
              formik.setFieldValue("usernameOrEmail", e.target.value)
            }
            onBlur={formik.handleBlur}
            error={Boolean(
              formik.errors?.usernameOrEmail && formik.touched?.usernameOrEmail
            )}
            errorText={
              formik.touched.usernameOrEmail && formik.errors?.usernameOrEmail
            }
          />
        </div>

        <div className="flex items-center justify-end my-3">
          <button className="ml-10" onClick={() => navigate("/login")}>
            انصراف
          </button>
          <Button
            title={"ارسال لینک بازیابی رمز عبور"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
