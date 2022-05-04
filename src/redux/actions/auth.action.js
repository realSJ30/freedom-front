import jsCookie from "js-cookie";
import AuthenticationApi from "../../utils/Api/auth.api";
import { admin_navs, moderator_navs, sub_navs } from "../../utils/navs/navs";
import { AuthConstants } from "../constants/auth.constant";

const api = new AuthenticationApi();

export const login = (credentials, goToDashboard) => {
  const { email, password } = credentials;
  return (dispatch) => {
    dispatch({ type: AuthConstants.LOGIN_REQUEST });
    api.getCsrfApi().then((res) => {
      api
        .loginApi({ email, password })
        .then((res) => {
          const { data, message } = res.data;
          console.log(res.data);
          if (data) {
            dispatch({
              type: AuthConstants.LOGIN_SUCCESS,
              payload: data,
            });
            jsCookie.set("isAuthenticated", true, {
              expires: 86400,
              sameSite: "lax",
            });
            goToDashboard();
          } else {
            dispatch({
              type: AuthConstants.LOGIN_FAILURE,
              payload: message,
            });
          }
        })
        .catch((err) => console.log(err));
    });
    // api.loginApi({ email, password }).then((res) => {
    //     const data = res.data;
    //     console.log(data)
    //     if (data.user) {
    //         dispatch({
    //             type: AuthConstants.LOGIN_SUCCESS,
    //             payload: data.user
    //         });
    //         jsCookie.set('_t', data.token, { expires: 86400, sameSite: 'lax' })
    //         jsCookie.set('isAuthenticated', true, { expires: 86400, sameSite: 'lax' })
    //         goToDashboard();
    //     } else {
    //         dispatch({
    //             type: AuthConstants.LOGIN_FAILURE
    //         })
    //     }
    // }).catch((err) => console.log(err));
  };
};

export const logout = (redirectLogin) => {
  return (dispatch) => {
    api
      .logoutApiWeb()
      .then((res) => {
        const response = res.data;
        console.log(response)
        jsCookie.remove("isAuthenticated");
        redirectLogin();
        dispatch({ type: AuthConstants.LOGOUT });
      })
      .catch((err) => console.log(err));
  };
};

export const getAuthenticatedUser = (setNavigation) => {
  return (dispatch) => {
    dispatch({ type: AuthConstants.FETCH_AUTHENTICATED_USER_REQUEST });
    api
      .fetchAuthenticatedUserApi()
      .then((res) => {
        const { data } = res.data;
        console.log(data);
        if (data) {
          if (data.role == 1) {
            setNavigation(admin_navs);
          } else if (data.role == 2) {
            setNavigation(moderator_navs);
          } else {
            setNavigation(sub_navs);
          }
          dispatch({
            type: AuthConstants.FETCH_AUTHENTICATED_USER_SUCCESS,
            payload: data,
          });
        } else {
          dispatch({
            type: AuthConstants.FETCH_AUTHENTICATED_USER_FAIL,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};
