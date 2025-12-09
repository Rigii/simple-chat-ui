import { type JSX } from "react";
import {
  Formik,
  Field,
  Form as FormikForm,
  ErrorMessage,
  type FieldProps,
  type FormikHelpers,
} from "formik";
import * as Yup from "yup";
import { Label, TextInput, Button } from "flowbite-react";
import { strings } from "./user-data.strings";
import type { IProps, IUserDataValues } from "./user-data.types";
import { postUserData } from "./user-data.api";
import { useUserContext } from "../../context/user-context/use-user-context";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  nickname: Yup.string()
    .min(3, "Nickname must be at least 3 characters")
    .required("Nickname is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function UserData({ initialValues }: IProps): JSX.Element {
  const { setUser } = useUserContext();

  const baseValues: IUserDataValues = {
    email: "",
    nickname: "",
    password: "",
    ...initialValues,
  };

  const onSubmit = async (
    values: IUserDataValues,
    { setSubmitting }: FormikHelpers<IUserDataValues>
  ) => {
    try {
      await postUserData(values);
      setUser(values);
    } catch (error) {
      console.error(strings.errorSubmittingUserData, error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white/80 dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">{strings.getStartedTitle}</h2>

      <Formik
        initialValues={baseValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <FormikForm className="space-y-4">
            <div>
              <Label htmlFor="email">{strings.emailLabel}</Label>
              <Field name="email">
                {({ field }: FieldProps) => (
                  <TextInput
                    {...field}
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="mt-1 min-w-sm"
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
              <Label htmlFor="nickname">{strings.nicknameLabel}</Label>
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
              <Label htmlFor="password">{strings.passwordLabel}</Label>
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
