/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  useColorScheme,
  TextInput as DefaultTextInput,
  View as DefaultView,
  Pressable,
} from "react-native";

import Colors from "../constants/Colors";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type TextInputProps = ThemeProps & DefaultTextInput["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundDim"
  );

  return (
    <DefaultTextInput
      style={[
        {
          color,
          backgroundColor,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 5,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function RoundButton(
  props: ViewProps & { onPress: () => void; title: string }
) {
  const { style, lightColor, darkColor, onPress, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundDim"
  );

  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          {
            backgroundColor,
            borderRadius: 5,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
          },
          style,
        ]}
        {...otherProps}
      >
        <Text>{props.title}</Text>
      </View>
    </Pressable>
  );
}

export function useTheme() {
  const theme = useColorScheme() ?? "light";
  const themeColors = Colors[theme];
  return themeColors;
}
