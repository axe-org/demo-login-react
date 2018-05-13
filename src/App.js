import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Router, Route } from 'react-router-native'
import { history, routes } from './router'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    let page = props.page
    history.replace('/' + page)
  }
  render () {
    return (
      <Router history={history}>
        <View style={styles.container}>
          {
            routes.map(function (route) {
              return <Route path={route.path} key={route.path} component={route.component} />
            })
          }
        </View>
      </Router>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64, // 这里我们还是选择在RN中设导航栏的 padding， 以允许之后使用RN构建导航栏。
    flex: 1
  }
})
