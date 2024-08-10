import axiosInterceptor from "../axiosinterceptor";
export function SignUpData({
  data,
}: {
  data: {
    username: string;
    password: string;
    role: string;
    country: string;
    city: string;
    email: string;
  };
}) {
  return axiosInterceptor.post("/user/", data);
}
export function SignInData({
  data,
}: {
  data: { username: string; password: string };
}) {
  console.log(data, "axios");
  return axiosInterceptor.post("/user/signin", {
    data,
  });
}
export function data1() {
  return axiosInterceptor.get("/user");
}
