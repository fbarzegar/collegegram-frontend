import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../store";
import { loginThunk } from "../features/userSlice";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data: {
    usernameOrEmail: string;
    password: string;
  }) => {
    try {
      const response = await dispatch(
        loginThunk({
          password: data.password,
          usernameOrEmail: data.usernameOrEmail,
        })
      ).unwrap();
      // dispatch(getCurrentUser());

      toast.success(response?.msg || "با موفقیت وارد شدید");
      navigate("/myCollegeGram");
    } catch (error) {
      console.log(error);
    }
  };

  return handleSubmit;
}
