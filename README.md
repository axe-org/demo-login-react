# demo-login-react

`demo-login`模块，使用`react-native`实现。

## 接口声明

我们分别使用了`react-native` 、`h5`和 `ios`原生来实现`login`模块，而三种不同实现的接口声明是相同的。

### model类型

登录模块有一个model类型，为 `UserInfoModel` ,格式如下 ：

    @property (nonatomic,strong) NSString *account; 
    @property (nonatomic,strong) NSNumber *level;
    @property (nonatomic,strong) NSDictionary *detailInfo;
    @property (nonatomic,strong) NSArray *tagList;

(关于model类型，只有完全由一个模块产生和控制的，才应该放在一个模块内。 所以这里的UserInfoModel实际上不符合这个条件，是应该放到 公共区域的。 但是这里为了测试，就放在这里展示一下。)

### 登录页面

* 路由： `axes://login/login`
* 参数： `account` : 字符串类型，自动填写的帐号
* 登录成功回调 ： 返回数据为 `{userInfo:model}`： 一个键为`userInfo` , model类型，即上诉的`UserInfoModel`.
* 登录成功发送通知 `LoginStatusChange` , 携带数据有两个：

    login: bool类型， 为true .
    userInfo: UserInfoModel类型。

* 登录成功后，会设置共享数据，`key`为`userInfo`, 值为`UserInfoModel`类型。

### 注册界面

* 路由: `axes://login/register`
* 参数： `account` : 字符串类型，自动填写的帐号
* 登录成功回调 ： 返回数据为 `{userInfo:model}`： 一个键为`userInfo` , model类型，即上诉的`UserInfoModel`.
* 登录成功发送通知 `LoginStatusChange` , 携带数据有两个：

    login: bool类型， 为true .
    userInfo: UserInfoModel类型。

* 注册成功，发送通知 `RegistAccountSuccess`, 携带数据为 `userInfo: UserInfoModel`
* 登录成功后，会设置共享数据，`key`为`userInfo`, 值为`UserInfoModel`类型。

## 注意事项

上述说明路由时，我们使用的是`axes://login/register` ，即声明路由。

## 多页面应用

我们推荐使用的 `react-native`为多页面应用， 使用原生导航栏，以做到更加接近原生的用户体验。

## 打包命令

我们的打包命令为

	react-native bundle --entry-file index.js --dev false --bundle-output bundle.js
	
我们约定了入口文件固定为 `index.js` ,且打包后的文件固定为 `bundle.js ` 