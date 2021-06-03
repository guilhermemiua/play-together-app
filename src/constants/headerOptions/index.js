import { COLORS } from '../colors';
import { METRICS } from '../metrics';

const HEADER_OPTIONS = {
  headerStyle: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
  headerTitleStyle: {
    fontFamily: METRICS.fontFamilyBold,
    fontSize: METRICS.fontSize * 1.4,
    // color: COLORS.white,
  },
  // headerTintColor: COLORS.white,
};

export { HEADER_OPTIONS };
