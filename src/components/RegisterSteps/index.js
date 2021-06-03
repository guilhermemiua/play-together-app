import React from 'react';
import { View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { COLORS, METRICS } from '../../constants';

const customStyles = {
  stepIndicatorSize: 45,
  currentStepIndicatorSize: 50,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 1,
  stepStrokeCurrentColor: COLORS.primary,
  stepStrokeWidth: 1,
  stepStrokeFinishedColor: COLORS.primary,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: COLORS.primary,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: COLORS.primary,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: METRICS.fontSize,
  currentStepIndicatorLabelFontSize: METRICS.fontSize,
  stepIndicatorLabelCurrentColor: COLORS.primary,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: METRICS.fontSize,
  currentStepLabelColor: COLORS.primary,
};

export default function RegisterSteps({ currentStep }) {
  return (
    <View
      style={{
        marginBottom: METRICS.margin,
      }}
    >
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentStep}
        renderLabel={false}
        stepCount={3}
      />
    </View>
  );
}

// import React, { Fragment } from 'react';

// import { View, StyleSheet, Text } from 'react-native';
// import { COLORS, METRICS } from '../../constants';

// export default function Steps({ steps = [1, 2, 3] }) {
//   return (
//     <View style={styles.steps}>
//       {steps.map((step, index) => {
//         if (index === steps.length - 1) {
//           return (
//             <Fragment key={step}>
//               <View style={styles.step}>
//                 <Text style={styles.stepText}>{step}</Text>
//               </View>
//             </Fragment>
//           );
//         }

//         return (
//           <Fragment key={step}>
//             <View style={styles.step}>
//               <Text style={styles.stepText}>{step}</Text>
//             </View>
//             <View style={styles.divider} />
//           </Fragment>
//         );
//       })}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   divider: {
//     height: 1,
//     backgroundColor: COLORS.primary,
//     flex: 1,
//     marginHorizontal: METRICS.margin,
//   },
//   steps: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   step: {
//     borderRadius: 50,
//     borderColor: COLORS.primary,
//     borderWidth: 1,
//     width: 50,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: COLORS.white,
//   },
//   stepText: {
//     color: COLORS.primary,
//   },
// });
