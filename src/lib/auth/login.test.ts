import { expect, test } from "vitest";
import { login } from "./login";

const email = "johndoe@gmail.com";
const password = "password";

test("login", async () => {
  expect(login(email, password)).resolves.toBeUndefined();
});
