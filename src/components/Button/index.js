import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button as ButtonElements } from 'react-native-elements';
import { COLORS, METRICS, normalize } from '../../constants';

function Button({ style, type = 'solid', title, onPress, ...props }) {
  return (
    <ButtonElements
      buttonStyle={{
        paddingVertical: METRICS.padding,
        borderRadius: 0,
        ...style,
      }}
      TouchableComponent={TouchableOpacity}
      type={type}
      title={title}
      onPress={onPress}
      titleStyle={{
        fontSize: METRICS.fontSize,
        lineHeight: METRICS.fontSize + 1,
        fontWeight: 'bold',
      }}
      {...props}
    />
  );
}

export default Button;

// import React from 'react';
// import { TouchableOpacity, StyleSheet, Text } from 'react-native';
// import { COLORS } from '../../constants/colors';

// export default function ButtonComponent({
//   color = 'primary',
//   textColor = 'primary',
//   style,
//   onPress,
//   children,
// }) {
//   return (
//     <TouchableOpacity
//       style={[styles.touchableOpacity, styles[color], style]}
//       onPress={onPress}
//     >
//       <Text style={[styles.text, styles[`${textColor}Text`]]}>{children}</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   touchableOpacity: {
//     paddingVertical: 10,
//   },
//   text: {
//     textAlign: 'center',
//   },
//   default: {
//     backgroundColor: COLORS.white,
//     borderColor: COLORS.primary,
//   },
//   primary: {
//     backgroundColor: COLORS.primary,
//   },
//   primaryText: {
//     color: COLORS.white,
//   },
// });
