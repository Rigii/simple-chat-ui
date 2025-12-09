import { type JSX } from "react";
import {
  Formik,
  Field,
  Form as FormikForm,
  ErrorMessage,
  type FieldProps,
} from "formik";
import * as Yup from "yup";
import { Label, TextInput, Button } from "flowbite-react";

type UserDataValues = {
  email: string;
  nickname: string;
  password: string;
};

type Props = {
  initialValues?: Partial<UserDataValues>;
  onSubmit?: (values: UserDataValues) => void | Promise<void>;
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  nickname: Yup.string()
    .min(3, "Nickname must be at least 3 characters")
    .required("Nickname is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function UserData({
  initialValues,
  onSubmit,
}: Props): JSX.Element {
  const baseValues: UserDataValues = {
    email: "",
    nickname: "",
    password: "",
    ...initialValues,
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white/80 dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Get started</h2>

      <Formik
        initialValues={baseValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // simulate network delay for UX locally
            await new Promise((r) => setTimeout(r, 500));
            if (onSubmit) await onSubmit(values);
            else console.log("Submitted user data:", values);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, isValid }) => (
          <FormikForm className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Field name="email">
                {({ field }: FieldProps) => (
                  <TextInput
                    {...field}
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="mt-1"
                  />
                )}
              </Field>
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <div>
              <Label htmlFor="nickname">Nickname</Label>
              <Field name="nickname">
                {({ field }: FieldProps) => (
                  <TextInput
                    {...field}
                    id="nickname"
                    type="text"
                    placeholder="Your display name"
                    required
                    className="mt-1"
                  />
                )}
              </Field>
              <ErrorMessage
                name="nickname"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Field name="password">
                {({ field }: FieldProps) => (
                  <TextInput
                    {...field}
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="mt-1"
                  />
                )}
              </Field>
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={isSubmitting || !isValid}>
                {isSubmitting ? "Saving..." : "Continue"}
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
}
