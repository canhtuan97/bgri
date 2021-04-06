import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'
import {useSelector, useDispatch} from 'react-redux';
import {user} from 'src/redux/user/userSlice';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  emailColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  emailIcon: {
    color: 'gray',
    fontSize: 30,
  },
  emailNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  emailNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  emailRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 16,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
})

const Email = ({ containerStyle}) => {
  const userInfo= useSelector(user);

  return(
  <TouchableOpacity>
    <View style={[styles.container, containerStyle]}>
      <View style={styles.iconRow}>
          <Image
            style={{height:55,width:55, marginLeft:10}}
            source={require('images/profile/key.png')}
          />
      </View>
      <View style={styles.emailRow}>
        <View style={styles.emailColumn}>
          <Text style={styles.emailText}>KEY</Text>
        </View>
        <View style={styles.emailNameColumn}>
            <Text style={styles.emailNameText}>{userInfo[0].user.private_key}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
)
}

// Email.propTypes = {
//   containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
//   email: PropTypes.string.isRequired,
//   index: PropTypes.number.isRequired,
//   name: PropTypes.string,
//   onPressEmail: PropTypes.func.isRequired,
// }

// Email.defaultProps = {
//   containerStyle: {},
//   name: null,
// }

export default Email