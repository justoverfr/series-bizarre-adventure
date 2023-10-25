import { expect, test } from "vitest";
import { signup } from "./signup";
import { login } from "./login";
import { logout } from "./logout";

const email = "johndoe@gmail.com";
const password = "password";

test("auth", async () => {
  expect(signup(email, password)).resolves.toBeUndefined();
  expect(login(email, password)).resolves.toBeUndefined();
  expect(logout()).resolves.toBeUndefined();
});
