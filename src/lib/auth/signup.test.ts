import { expect, test } from "vitest";
import { signup } from "./signup";

const username = "Johnny";
const email = "johndoe@gmail.com";
const password = "password";

test("signup", async () => {
  expect(signup(username, email, password)).resolves.toBeUndefined();
});
