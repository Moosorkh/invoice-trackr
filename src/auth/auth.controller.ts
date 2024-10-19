import { Controller, Post, Body } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  @Post("login")
  login(@Body() body) {
    const { email, password } = body;
    if (
      email === "your_test_email@example.com" &&
      password === "your_test_password"
    ) {
      return { access_token: "dummy-jwt-token" };
    } else {
      return { error: "Invalid credentials" };
    }
  }
}
