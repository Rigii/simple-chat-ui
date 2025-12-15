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
import type { IPostUserData } from "./user-data.types";
import { postUserData } from "./user-data.api";
import { useUserContext } from "../../context/user-context/use-user-context";
import { useNavigate } from "react-router-dom";
import { SCREEN_ROUTES } from "../../constants-global/screen-routes";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  nickname: Yup.string()
    .min(3, "Nickname must be at least 3 characters")
    .required("Nickname is required"),
});

export default function SignUp(): JSX.Element {
  const { user, onSetUser } = useUserContext();
  const navigate = useNavigate();

  const baseValues: IPostUserData = {
    email: user?.email ?? "",
    nickname: user?.nickname ?? "",
  };

  const onSubmit = async (
    values: IPostUserData,
    { setSubmitting }: FormikHelpers<IPostUserData>
  ) => {
    try {
      const responce = await postUserData(values);
      if (!responce._id) {
        return;
      }

      onSetUser(responce);
    } catch (error) {
      console.error(strings.errorSubmittingUserData, error);
    } finally {
      setSubmitting(false);
      navigate(SCREEN_ROUTES.CHAT_LIST);
    }
  };

  return (
    <div className="flex flex-1 mx-auto p-6 dark:bg-gray-800 rounded-lg shadow items-center justify-center h-screen">
      <div className="flex w-xl flex-col">
        <h2 className="text-2xl font-semibold mb-4">
          {strings.getStartedTitle}
        </h2>

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

              <div className="pt-2">
                <Button type="submit" disabled={isSubmitting || !isValid}>
                  {isSubmitting ? "Saving..." : "Continue"}
                </Button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
}
