import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerApi: builder.mutation({
      query: (registerInfo) => ({
        url: `/api/v1/user/register`,
        method: "POST",
        body: registerInfo,
      }),
      invalidatesTags: ["web-auth"],
    }),
    sendOtpApi: builder.mutation({
      query: (otpInfo) => ({
        url: `/api/v1/otp/send`,
        method: "POST",
        body: otpInfo,
      }),
      invalidatesTags: ["web-auth"],
    }),
    verifyOtpApi: builder.mutation({
      query: (otpInfo) => ({
        url: `/api/v1/otp/verify`,
        method: "POST",
        body: otpInfo,
      }),
      invalidatesTags: ["web-auth"],
    }),
    loginApi: builder.mutation({
      query: (loginInfo) => ({
        url: `/api/v1/auth/login`,
        method: "POST",
        body: loginInfo,
      }),
      invalidatesTags: ["web-auth"],
    }),
    forgotPasswordApi: builder.mutation({
      query: (forgotPasswordInfo) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: forgotPasswordInfo,
      }),
      invalidatesTags: ["web-auth"],
    }),
    resetPasswordApi: builder.mutation({
      query: (resetPasswordInfo) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: resetPasswordInfo,
      }),
      invalidatesTags: ["web-auth"],
    }),
    resendOtpApi: builder.mutation({
      query: (resendOtpInfo) => ({
        url: `/auth/resend-otp`,
        method: "POST",
        body: resendOtpInfo,
      }),
      invalidatesTags: ["web-auth"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterApiMutation,
  useSendOtpApiMutation,
  useVerifyOtpApiMutation,
  useLoginApiMutation,
  useForgotPasswordApiMutation,
  useResetPasswordApiMutation,
  useResendOtpApiMutation,
} = authApi;
