import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import login from "../logic/login";
import { loginValidation } from "../utils/validations";

import Button from "../component/button";
import Input from "../component/input";

import gmail from "../assets/icons/gmail.svg";
import key from "../assets/icons/key.svg";
import back from "../assets/icons/arrow-back.svg";
import { useUser, useUserStatus } from "../features/hooks";

export default function LoginPage() {
  const navigate = useNavigate();
  const status = useUserStatus();
  const user = useUser();

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: loginValidation,
    onSubmit: login(),
  });

  return (
    <div className="flex column mt-6 justify-center text-center">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex my-3 text-center justify-center">
          <Link
            to={user ? "/login-switch" : "/login"}
            className={"mx-2 text-gray-700"}
          >
            ورود به کالج گرام
          </Link>
          <span className="mx-4 text-gray-400 "> |</span>
          <Link
            className={" mx-2 text-gray-400 "}
            to={!user ? "/signup" : "/signup-switch"}
          >
            ثبت نام در کالج گرام
          </Link>
        </div>
        <div className="mt-12 mb-8">
          <Input
            placeholder="نام کاربری یا ایمیل "
            postfix={
              <img src={gmail} alt="key" className="absolute mt-3 px-2" />
            }
            value={formik.values.usernameOrEmail}
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
        <Input
          type="password"
          placeholder="رمز عبور"
          postfix={<img src={key} alt="key" className="absolute mt-3 px-2" />}
          value={formik.values.password}
          onChange={(e: any) =>
            formik.setFieldValue("password", e.target.value)
          }
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors?.password && formik.touched?.password)}
          errorText={formik.touched.password && formik.errors?.password}
        />
        <div className="flex items-center my-5 mr-2">
          <input
            type="checkbox"
            className="w-4 h-4 text-[#587052] bg-gray-100 border-gray-300 rounded dark:bg-gray-700 "
          />
          <label className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-500">
            من را به خاطر بسپار
          </label>
        </div>
        <div className="flex justify-end my-3">
          <Button type="submit" title={"ورود"} />
        </div>
        <button
          className="flex items-center mt-10 mb-2"
          onClick={() => navigate("/recoveryPassword")}
        >
          <img src={back} alt="back" className="mt-2 ml-2" />
          <p className="text-[#C19008]">رمز عبورم رو فراموش کردم</p>
        </button>
        <button
          className="flex items-start"
          onClick={() => navigate("/signup")}
        >
          <img src={back} alt="back" className="mt-2 ml-2" />
          <p className="text-[#C19008]">ثبت نام در کالج گرام </p>
        </button>
      </form>
    </div>
  );
}
