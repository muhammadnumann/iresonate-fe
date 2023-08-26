import { StringSchema, NumberSchema } from "yup"

const yup = require("yup")

const charOnlyRegEx = /^[a-zA-Z\s]*$/
const passwordRedExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

yup.addMethod(yup.string, "charOnly", function (
   this: StringSchema,
   message: string
) {
   const tmessage =
      typeof message === "undefined" ? "Must be character only" : message
   return this.matches(charOnlyRegEx, tmessage)
})


yup.addMethod(yup.string, "password", function (
    this: StringSchema,
    message: string
  ) {
    const tmessage =
      typeof message === "undefined"
        ? "Must Contain minimum 8 Characters,\n One Uppercase,\n One Lowercase,\n One Number and one special case Character "
        : message;
    return this.matches(passwordRedExp, tmessage);
  });
  
export default yup
