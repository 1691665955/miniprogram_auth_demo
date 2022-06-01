// index.js
// 获取应用实例
const auth = require("../../utils/auth.js");

Page({
  data: {

  },

  onLoad() {

  },

  // 获取权限
  getAuth: function () {
    auth.getAuth({
      scope: auth.Scopes.camera,
      desc: "扫码需要打开摄像头权限",
      success: function () {
        console.log("success")
        // 授权成功，继续处理相关事件
      }
    })
  }
})