import { Text as ThemedText, TextProps } from './Themed';

export function Text(props: TextProps) {
  return <ThemedText {...props} style={[props.style, { fontFamily: 'Raleway_400Regular' }]} />;
}

export function SemiBoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Raleway_600SemiBold' }]} />;
}

