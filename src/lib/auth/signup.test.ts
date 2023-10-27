import { expect, test } from "vitest";
import { signup } from "./signup";

const email = "johndoe@gmail.com";
const password = "password";

test("signup", async () => {
  expect(signup(email, password)).resolves.toBeUndefined();
});
