import { z } from "zod";

const DataWhileRegistration = z.object({
  name: z
    .string({
      required_error: "invalid username",
    })
    .trim(),
  phone: z
    .string({
      required_error: "mobile Number must be present",
    })
    .regex(/^\d{10}$/, {
      message: "Invalid mobile number. It should be exactly 10 digits.",
    }),
  email: z
    .string({
      required_error: "email address is required",
    })
    .email("Invalid Email Address"),
  password: z
    .string({
      required_error: "password can't be empty",
    })
    .min(8, "password must be 8 letter long"),
});

const dataWhileLogin = z.object({
  phone: z
    .string({
      required_error: "mobile Number must be present",
    })
    .regex(/^\d{10}$/, {
      message: "Invalid mobile number. It should be exactly 10 digits.",
    }),
  password: z
    .string({
      required_error: "password can't be empty",
    })
    .min(8, "password must be 8 letter long"),
});

export { dataWhileLogin, DataWhileRegistration };
