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
