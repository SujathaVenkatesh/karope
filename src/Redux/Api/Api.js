import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, URL } from "./Constant";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { endpoint }) => {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      console.log("user_detailskss", token, endpoint);
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
      console.log("Endpoints", endpoint);
      // For multipart uploads, let the browser set Content-Type with boundary
      const multipartEndpoints = [
        "addGraphicalQuestion",
        "addPaperQuestion",
        "uploadTextQuestionsCsv",
        "updateGraphicalQuestion",
        "addPastQuestion",
        "updatePastQuestion",
        "uploadSubjectUnitsCsv",
        "uploadUnitTopicsCsv",
      ];
      if (!multipartEndpoints.includes(endpoint)) {
        headers.set("Content-Type", "application/json");
      }
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  refetchOnMountOrArgChange: true,
  tagTypes: [],
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (payload) => ({
        url: URL.LOGIN,
        method: "POST",
        body: payload,
      }),
    }),

    // Auth: reset password
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: URL.PASSWORD_RESET,
        method: "POST",
        body: payload,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: URL.PASSWORD_FORGOT,
        method: "POST",
        body: payload,
      }),
    }),

    otpPassword: builder.mutation({
      query: (payload) => ({
        url: URL.PASSWORD_OTP,
        method: "POST",
        body: payload,
      }),
    }),

    // logout

    logout: builder.mutation({
      query: (payload) => ({
        url: URL.LOGOUT,
        method: "POST",
        body: payload,
      }),
    }),

    // menu

    menulistget: builder.query({
      query: () => ({
        url: URL.FEATURES,
        method: "GET",
      }),
    }),

    menupostupdate: builder.mutation({
      query: (payload) => ({
        url: URL.FEATURES,
        method: "POST", 
        body: payload,
      }),
    }),

    menudetailview: builder.query({
      query: (id) => ({
        url: URL.FEATURES / { id },
        method: "GET",
      }),
    }),

    menupdate: builder.mutation({
      query: ({ id, payload }) => ({
        url: `${URL.FEATURES}/${id}`,
        method: "PUT", // or PUT / PATCH depending on API
        body: payload,
      }),
    }),

    menudelete: builder.mutation({
      query: ({ id }) => ({
        url: `${URL.FEATURES}/${id}`,
        method: "DELETE", // or PUT / PATCH depending on API

      }),
    }),

    menuactive: builder.mutation({
      query: ({ id }) => ({
        url: `${URL.FEATURES}/${id}/activate`,
        method: "PATCH", // or PUT / PATCH depending on API

      }),
    }),

    menudeactive: builder.mutation({
      query: ({ id }) => ({
        url: `${URL.FEATURES}/${id}/deactivate`,
        method: "PATCH", // or PUT / PATCH depending on API

      }),
    }),

      // banner
    banner: builder.query({
      query: () => ({
        url: URL.BANNER,
        method: "GET",
      }),
    }),

    bannerupdate: builder.mutation({
      query: ({ id, payload }) => ({
        url: `${URL.BANNER}/${id}`,
        method: "PUT", // or PUT / PATCH depending on API
        body: payload,
      }),
    }),

    bannerdelete: builder.mutation({
      query: ({ id }) => ({
        url: `${URL.BANNER}/${id}`,
        method: "DELETE", // or PUT / PATCH depending on API

      }),
    }),

     bannerpostupdate: builder.mutation({
      query: (payload) => ({
        url: URL.BANNER,
        method: "POST", 
        body: payload,
      }),
    }),

      banneractive: builder.query({
        query: ({ id }) => ({
        url: `${URL.BANNER}/${id}`,
        method: "GET",
        }),
      }),

      // Support
      support: builder.query({
        query: ({status}) => ({
          url: `${URL.SUPPORT}/tickets?status=${status}`,
          method: "GET",
          // params: payload,
        }),
      }),

      supportticket: builder.query({
        query: (id) => ({
          url: `${URL.SUPPORT}/ticket/${id}`,
          method: "GET",
        }),
      }),

supportreplay: builder.mutation({
  query: ({ id, message }) => ({
    url: `${URL.SUPPORT}/ticket/${id}/message`,
    method: "POST",
    body: { message },
  }),
}),
supportfaqlist: builder.query({
  query: () => ({
    url: `${URL.SUPPORT}/faqs`,
    method: "GET",
  }),
}),
supportfaqcreate: builder.mutation({
  query: ({ question, answer }) => ({
    url: `${URL.SUPPORT}/faq`,
    method: "POST",
    body: { question, answer },
  }),
}),
supportfaqupdate: builder.mutation({
  query: ({ id, question, answer }) => ({
    url: `${URL.SUPPORT}/faq/${id}`,
    method: "PUT",
    body: { question, answer },
  }),
}),
supportfaqdelete: builder.mutation({
  query: ({ id }) => ({
    url: `${URL.SUPPORT}/faq/${id}`,
    method: "DELETE",
  }),
}),
      // notification

      notificationsend: builder.mutation({
      query: (body) => ({
        url: URL.NOTIFICATION,
        method: "POST", 
        body: body,
      }),
      invalidatesTags: ["Notifications"],
    }),

    notificationsent: builder.query ({
      query: ({page=1, limit=10}) => ({
        url: `${URL.NOTIFICATION_SENT}?page=${page}&limit=${limit}`,
        method: "GET"
      }),
      providesTags: ["Notifications"],
    }),


    notificationdetails: builder.query ({
      query: (id) => ({
        url: `${URL.NOTIFICATION_DETAILS}/${id}`,
        method: "GET"
      }),
    }),

    // user list

    userlist: builder.query({
      query: () => ({
        url: URL.USER_LIST,
        method: "GET",
      }),
    }),

    // cashback

    cashpost: builder.mutation ({
      query: (body) => ({
        url: URL.CASHBACK,
        method: "POST",
        body: body,

      }),
    }),

    cashupdate: builder.mutation({
      query: ({id, body}) => ({
        url: `${URL.CASHBACK}/${id}`,
        method: "PUT",
        body: body,
      }),
    }),

    cashdelete: builder.mutation({
      query: ({id, body}) => ({
        url: `${URL.CASHBACK}/${id}`,
        method: "DELETE",
      }),
    }),

    cashlist: builder.query ({
      query: () => ({
        url: URL.CASHBACK_LIST,
        method: "GET",
      })
    })





  }),
});



export const {
  // login
  useLoginMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useOtpPasswordMutation,
  // logout
  useLogoutMutation,
  // menu
  useMenulistgetQuery,//get
  useMenudetailviewQuery,
  useMenuactiveMutation,
  useMenudeactiveMutation,
  useMenudeleteMutation,
  useMenupdateMutation,
  useMenupostupdateMutation,
  // Banner
  useBannerQuery,
  useBannerupdateMutation,
  useBannerdeleteMutation,
  useBannerpostupdateMutation,
  useBanneractiveQuery,
  // Support
  useLazySupportQuery,
  useSupportticketQuery,
  useSupportreplayMutation,
  useSupportfaqlistQuery,
  useSupportfaqcreateMutation,
  useSupportfaqupdateMutation,
  useSupportfaqdeleteMutation,
  // notification
  useNotificationsendMutation,
  useNotificationdetailsQuery,
  useNotificationsentQuery,
  // userlist
  useUserlistQuery,
  // cashback
  useCashpostMutation,
  useCashdeleteMutation,
  useCashlistQuery,
  useCashupdateMutation,



} = api;

