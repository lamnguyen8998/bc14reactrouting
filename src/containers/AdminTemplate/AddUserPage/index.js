import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actAddUser } from "./modules/actions";

export default function AddUserPage() {
  const loading = useSelector((state) => state.addUserReducer.loading);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDT: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "KhachHang",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    dispatch(actAddUser(state));
  };

  return (
    <form className="container" onSubmit={handleAddUser}>
      <h3>Thêm Người Dùng</h3>
      <div className="form-group">
        <span>Tài Khoản</span>
        <input
          className="form-control"
          name="taiKhoan"
          onChange={handleOnChange}
        />
      </div>
      <div className="form-group">
        <span>Mật khẩu</span>
        <input
          className="form-control"
          name="matKhau"
          onChange={handleOnChange}
        />
      </div>
      <div className="form-group">
        <span>Họ Tên</span>
        <input
          className="form-control"
          name="hoTen"
          onChange={handleOnChange}
        />
      </div>
      <div className="form-group">
        <span>Email</span>
        <input
          className="form-control"
          name="email"
          onChange={handleOnChange}
        />
      </div>
      <div className="form-group">
        <span>Số điện thoại</span>
        <input className="form-control" name="soDt" onChange={handleOnChange} />
      </div>

      <div className="form-group">
        <button
          type="submit"
          className="btn btn-success"
          onChange={handleOnChange}
        >
          Add user
        </button>
      </div>
    </form>
  );
}
