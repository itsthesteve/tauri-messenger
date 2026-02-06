import * as z from "zod";

// TODO: Test this thoroughly
export const SCREEN_NAME_REGEX = /[a-z0-9_\-+*~!@#$%^&*()\\\/<>?.,]+/;

export const SCREEN_NAME_MIN_LEN = 3;
export const SCREEN_NAME_MAX_LEN = 16;

export const PASS_MIN_LEN = 8;
export const PASS_MAX_LEN = 128;

// Form control IDs
const ctrl = {
  screenName: "screenName",
  confirmScreenName: "confirmScreenName",
  password: "password",
  confirmPassword: "confirmPassword",
};

// TODO: Tighten types
const errors: Record<string, any> = {
  [ctrl.screenName]: {
    min: `Screen name must be at least ${SCREEN_NAME_MIN_LEN} characters`,
    max: `Screen name cannot be more than ${SCREEN_NAME_MAX_LEN} characters`,
  },
  [ctrl.password]: {
    min: `Password must be at least ${PASS_MIN_LEN} characters`,
    max: `Password must be no more than ${PASS_MAX_LEN} characters`,
  },
};

/**
 * The keys need to align to the form ID/form control names
 */
export const ScreenNameSchema = z
  .object({
    [ctrl.screenName]: z
      .string()
      .min(SCREEN_NAME_MIN_LEN, errors[ctrl.screenName].min)
      .max(SCREEN_NAME_MAX_LEN, errors[ctrl.screenName].max)
      .trim(),
    [ctrl.confirmScreenName]: z
      .string()
      .min(SCREEN_NAME_MIN_LEN, errors[ctrl.screenName].min)
      .max(SCREEN_NAME_MAX_LEN, errors[ctrl.screenName].max)
      .trim(),
    [ctrl.password]: z
      .string()
      .min(PASS_MIN_LEN, errors[ctrl.password].min)
      .max(PASS_MAX_LEN, errors[ctrl.password].max)
      .trim(),
    [ctrl.confirmPassword]: z
      .string()
      .min(PASS_MIN_LEN, errors[ctrl.password].min)
      .max(PASS_MAX_LEN, errors[ctrl.password].max)
      .trim(),
  })
  .refine((data) => data[ctrl.password] === data[ctrl.confirmPassword], {
    message: "Passwords do not match",
    path: [ctrl.confirmPassword],
  })
  .refine(
    (data) =>
      data[ctrl.screenName].toLowerCase() ===
      data[ctrl.confirmScreenName].toLowerCase(),
    {
      message: "Screen names do not match",
      path: [ctrl.confirmScreenName],
    },
  )
  .refine((data) => SCREEN_NAME_REGEX.test(data[ctrl.screenName]), {
    message: "Screen name has invalid characters",
    path: [ctrl.screenName],
  });
