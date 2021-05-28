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
  ...props
}) {
  return (
    <TextElements
      h1={h1}
      h2={h2}
      h3={h3}
      h4={h4}
      h1Style={{
        fontSize: METRICS.fontSize * 1.8,
      }}
      style={{
        color: COLORS.white,
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
