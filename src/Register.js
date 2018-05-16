import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
  SegmentedControlIOS
} from 'react-native'
import axe from 'axe-react'
import Loader from './Loader'
import Toast from 'react-native-easy-toast'

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      account: '',
      password: '',
      lastName: '',
      firstName: '',
      selectedIndex: 0,
      loading: false
    }
    axe.navigation.setTitle('注册')
  }
  onPressRegister () {
    if (this.state.account.trim() === '') {
      return this.refs.toast.show('请输入帐号！！')
    }
    if (this.state.firstName.trim() === '') {
      return this.refs.toast.show('请输入名！！！')
    }
    if (this.state.lastName.trim() === '') {
      return this.refs.toast.show('请输入姓！！！')
    }
    if (this.state.password.trim() === '') {
      return this.refs.toast.show('请输入密码！！！')
    }
    this.setState({loading: true})
    setTimeout(() => {
      this.setState({loading: false})
      this.refs.toast.show('注册成功。')
      setTimeout(() => {
        let data = axe.data.create()
        // model 类型效果展示。
        let gender = ['男', '中', '女'][this.state.selectedIndex]
        let userInfo = {
          account: this.state.account,
          level: 1,
          detailInfo: {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: gender
          },
          tagList: []
        }
        data.setModel('userInfo', userInfo)
        // 共享数据分享数据
        axe.data.sharedData.setModel('userInfo', userInfo)
        // 事件通知，且分享数据
        data.setBoolean('login', true)
        axe.event.postEvent('LoginStatusChange', data)
        axe.event.postEvent('RegistAccountSuccess', data)
        // 回调的处理。
        // 在 react-native中 routeInfo是固定的属性。
        if (axe.router.routeInfo.needCallback) {
          // 在RN中的默认回调，也是会自动关闭页面的。
          axe.router.callback(data)
        } else {
          // 如果没有回调，则手动关闭页面。
          // 另一种确保页面正确关闭，需要这里`close`时传具体页数。
          axe.navigation.closePage()
        }
      }, 1000)
    }, 2000)
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
            <Text style={styles.label}>姓</Text>
            <TextInput maxLength={20} clearButtonMode='while-editing' style={styles.forminput} onChangeText={(text) => this.setState({lastName: text})}
              value={this.state.lastName} />
          </View>
          <View style={styles.formitem}>
            <Text style={styles.label}>名</Text>
            <TextInput maxLength={20} clearButtonMode='while-editing' style={styles.forminput} onChangeText={(text) => this.setState({firstName: text})}
              value={this.state.firstName} />
          </View>
          <View style={styles.formitem}>
            <Text style={styles.label}>性别</Text>
            <SegmentedControlIOS style={styles.segment} values={['男', '中', '女']} selectedIndex={this.state.selectedIndex}
              onChange={(event) => { this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex}) }} />
          </View>
          <View style={styles.formitem}>
            <Text style={styles.label}>密码</Text>
            <TextInput maxLength={20} clearButtonMode='while-editing' style={styles.forminput} onChangeText={(text) => this.setState({password: text})}
              value={this.state.password} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
  segment: {
    height: 40,
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
