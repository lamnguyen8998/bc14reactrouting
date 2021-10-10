import * as ActionType from "./constants";
import api from "./../../../../utils/apiUtils";
// Giả sữ thời gian log out là 3.600.000 (1 giờ)
const TIME_EXP = 3600000;
// const TIME_EXP = 10000;

export const actAuthApi = (user, history) => {
  return (dispatch) => {
    dispatch(actAuthRequest());
    api
      .post("QuanLyNguoiDung/DangNhap", user)
      .then((result) => {
        // Check maLoaiNguoiDung
        if (result.data.content.maLoaiNguoiDung === "KhachHang") {
          return Promise.reject({
            response: {
              data: {
                content: "Bạn không có quyền truy cập",
              },
            },
          });
        }

        const date = new Date().getTime();
        const exp = date + TIME_EXP;

        // Thời gian hết phiên làm việc
        // Lưu exp xuống localStore

        console.log(exp);
        console.log(date);
        localStorage.setItem("exp", exp);
        dispatch(actSettimeLogout(history, TIME_EXP));

        // Lưu trạng thái login
        localStorage.setItem("UserAdmin", JSON.stringify(result.data.content));

        // redirect dashboard
        history.replace("/dashboard");
        // SetTimeout để logout
        dispatch(actAuthSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actAuthFailed(error));
      });
  };
};

export const actLogout = (history) => {
  // Xóa local store
  localStorage.removeItem("UserAdmin");
  localStorage.removeItem("exp");

  //redirect nó về trang auth
  history.replace("/auth");

  // Cleaer Reducer
  return {
    type: ActionType.AUTH_CLEAR_DATA,
  };
};

const actSettimeLogout = (history, exp) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(actLogout(history));
    }, exp);
  };
};

// Trường hợp reload lại trang web
export const actTryLogin = (history) => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem("UserAdmin"));
    if (!user) return;

    // Tính toán thời gian exp
    const exp = localStorage.getItem("exp");
    const date = new Date().getTime();
    if (date > exp) {
      dispatch(actLogout(history));
      return;
    }
    dispatch(actSettimeLogout(history, exp - date));
    dispatch(actAuthSuccess(user));
  };
};

const actAuthRequest = () => {
  return {
    type: ActionType.AUTH_REQUEST,
  };
};

const actAuthSuccess = (data) => {
  return {
    type: ActionType.AUTH_SUCCESS,
    payload: data,
  };
};

const actAuthFailed = (error) => {
  return {
    type: ActionType.AUTH_FAILED,
    payload: error,
  };
};
