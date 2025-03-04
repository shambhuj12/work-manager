import { httpAxios } from "@/helper/httpHelper";

export async function addUser(data) {
  const result = await httpAxios
    .post("/api/users", data)
    .then((response) => response.data);
  return result;
}

export async function login(Logindata) {
  const result = await httpAxios
    .post("/api/login", Logindata)
    .then((response) => response.data);
  return result;
}

export async function currentUser() {
  const result = await httpAxios
    .get("/api/current")
    .then((response) => response.data);
  return result;
}

export async function logout() {
  const result = await httpAxios
    .post("/api/logout")
    .then((response) => response.data);
  return result;
}
