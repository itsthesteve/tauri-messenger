export type SignInState = {
  profiles: string[];
  selectedProfile: string | null;
  errors: FormError[];
};

export type FormError = {
  key: string;
  reason: string;
};
