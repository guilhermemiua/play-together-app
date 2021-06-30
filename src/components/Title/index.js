import React from 'react';
import { Text as TextElements } from 'react-native-elements';
import { COLORS, METRICS } from '../../constants';

function Title({
  h1,
  h2,
  h3,
  h4,
  style,
  textAlign = 'center',
  children,
  color = COLORS.white,
  ...props
}) {
  return (
    <TextElements
      h1={h1}
      h2={h2}
      h3={h3}
      h4={h4}
      h1Style={{
        fontSize: METRICS.fontSize * 2,
        fontFamily: METRICS.fontFamilyBold,
      }}
      h2Style={{
        fontSize: METRICS.fontSize * 1.6,
        fontFamily: METRICS.fontFamilyBold,
      }}
      h3Style={{
        fontSize: METRICS.fontSize * 1.4,
        fontFamily: METRICS.fontFamilyBold,
      }}
      h4Style={{
        fontSize: METRICS.fontSize * 1.125,
        fontFamily: METRICS.fontFamilyBold,
      }}
      style={{
        color,
        textAlign,
        ...style,
      }}
      {...props}
    >
      {children}
    </TextElements>
  );
}

export default Title;
