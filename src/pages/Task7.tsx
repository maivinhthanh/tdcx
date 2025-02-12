import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

export default function SignupForm() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg sm:w-96">
      <h2 className="text-2xl font-bold mb-4 text-left">Sign Up</h2>

      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form Data:", values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Name Input */}
            <div className="text-left">
              <label className="block text-gray-700">Name</label>
              <Field name="name" type="text" className="w-full p-2 border rounded" />
              <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
            </div>

            {/* Email Input */}
            <div className="text-left">
              <label className="block text-gray-700">Email</label>
              <Field name="email" type="email" className="w-full p-2 border rounded" />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
            </div>

            {/* Password Input */}
            <div className="text-left">
              <label className="block text-gray-700">Password</label>
              <Field name="password" type="password" className="w-full p-2 border rounded" />
              <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {isSubmitting ? "Submitting..." : "Sign Up"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
