import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight
} from 'react-native'
import axe from 'axe-react'
import Loader from './Loader'
import Toast from 'react-native-easy-toast'

export default class Login extends Component {
  constructor (props) {
    super(props)
    let initState = { account: '', password: '', loading: false }
    if (axe.router.routeInfo.payload) {
      let account = axe.router.routeInfo.payload.get('account')
      if (account) {
        initState['account'] = account
      }
    }
    this.state = initState
    axe.navigation.setTitle('登录')
  }
  onPressLogin () {
    if (this.state.account.trim() === '') {
      return this.refs.toast.show('请输入帐号！！')
    }
    if (this.state.password.trim() === '') {
      return this.refs.toast.show('请输入密码！！！')
    }
    this.setState({loading: true})
    setTimeout(() => {
      this.setState({loading: false})
      this.refs.toast.show('登录成功。')
      setTimeout(() => {
        let data = axe.data.create()
        // model 类型效果展示。
        let userInfo = {
          account: this.state.account,
          level: 11,
          detailInfo: {
            firstName: 'hello',
            lastName: 'world',
            gender: 'FTM'
          },
          tagList: ['a', 'b', 'c']
        }
        data.setModel('userInfo', userInfo)
        // 共享数据分享数据
        axe.data.sharedData.setModel('userInfo', userInfo)
        // 事件通知，且分享数据
        data.setBoolean('login', true)
        axe.event.postEvent('LoginStatusChange', data)
        // 回调的处理。
        // 在 react-native中 routeInfo是固定的属性。
        if (axe.router.routeInfo.needCallback) {
          // 在RN中的默认回调，也是会自动关闭页面的。
          axe.router.callback(data)
        } else {
          // 如果没有回调，则手动关闭页面。
          axe.navigation.closePage()
        }
      }, 1000)
    }, 2000)
  }
  onPressRegister () {
    // 页面跳转，要确保页面能正确关闭
    if (axe.router.routeInfo.needCallback) {
      axe.navigation.push('register')
    } else {
      axe.navigation.redirect('register')
    }
  }
  render () {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Toast ref='toast' />
          <Loader loading={this.state.loading} />
          <View style={styles.formitem}>
            <Text style={styles.label}>帐号</Text>
            <TextInput maxLength={20} clearButtonMode='while-editing'
              style={styles.forminput}
              onChangeText={(text) => this.setState({account: text})}
              value={this.state.account}
            />
          </View>
          <View style={styles.formitem}>
            <Text style={styles.label}>密码</Text>
            <TextInput maxLength={20} clearButtonMode='while-editing' secureTextEntry={!false} style={styles.forminput} onChangeText={(text) => this.setState({password: text})}
              value={this.state.password} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
            <TouchableHighlight style={styles.button} onPress={this.onPressLogin.bind(this)} underlayColor='#66C1FF'>
              <Text style={styles.btntitle}>登 录</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={this.onPressRegister.bind(this)} underlayColor='#66C1FF'>
              <Text style={styles.btntitle}>注 册</Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  formitem: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10
  },
  forminput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    width: 220,
    paddingLeft: 5,
    paddingRight: 5
  },
  label: {
    width: 50,
    fontSize: 16.5,
    color: '#333333',
    textAlign: 'center'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  button: {
    backgroundColor: '#0C9EFF',
    width: 120,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  btntitle: {
    backgroundColor: 'transparent',
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold'
  }
})
