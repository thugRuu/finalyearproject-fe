import axiosInterceptor from "../axiosinterceptor";
export function SignUpData({
  data,
}: {
  data: { username: string; password: string; role: string };
}) {
  return axiosInterceptor.post("/user/", data);
}
export function SignInData({
  data,
}: {
  data: { username: string; password: string };
}) {
  return axiosInterceptor.post("/user/", data);
}
