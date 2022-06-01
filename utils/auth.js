/**
 * 权限类别
 */
const Scopes = {
  location: "scope.userLocation", // 地理位置
  locationBackground: "scope.userLocationBackground", // 后台定位
  record: "scope.record", // 麦克风
  camera: "scope.camera", // 摄像头
  bluetooth: "scope.bluetooth", // 蓝牙
  writePhtotsAlbum: "scope.writePhotosAlbum", // 添加到相册
  addPhoneContact: "scope.addPhoneContact", // 添加到联系人
  addPhoneCalendar: "scope.addPhoneCalendar", // 添加到日历
  werun: "scope.werun" // 微信运动步数
};

/**
 * 获取相关权限
 */
function getAuth({
  scope = Scopes.camera,
  desc = "拍照需要打开摄像头权限",
  success = () => {}
}) {
  wx.getSetting({
    success: function (res) {
      if (res.authSetting[scope] == undefined) {
        wx.authorize({
          scope: scope,
          success: function () {
            success()
          }
        })
      } else if (res.authSetting['scope.camera']) {
        success()
      } else {
        wx.showModal({
          content: desc + "，请确认打开？",
          cancelColor: "#666666",
          confirmColor: "#02bb00",
          cancelText: "取消",
          confirmText: "确认",
          success: function (e) {
            if (e.confirm) {
              wx.openSetting({
                success: function (res) {
                  if (res.authSetting[scope]) {
                    success()
                  }
                }
              })
            }
          }
        })
      }
    }
  })
}

module.exports = {
  Scopes,
  getAuth
}