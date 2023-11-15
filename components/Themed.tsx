/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  useColorScheme,
  TextInput as DefaultTextInput,
  FlatList as DefaultFlatList,
  View as DefaultView,
  Pressable,
  ActivityIndicator,
} from "react-native";

import Colors from "../constants/Colors";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type TextInputProps = ThemeProps & DefaultTextInput["props"];
export type FlatListProps = ThemeProps & DefaultFlatList["props"]

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

export function FlatList(props: FlatListProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultFlatList style={[{ backgroundColor }, style]} {...otherProps} />;
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

export function InputItem({
  label,
  value,
  onChangeText,
  textInputProps,
  containerStyle,
}: {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  textInputProps?: any;
  containerStyle?: any;
}) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 20,
        },
        containerStyle,
      ]}
    >
      <Text style={{ width: 100 }}>{`${label}:`}</Text>
      <TextInput
        value={value}
        placeholder={label}
        onChangeText={onChangeText}
        style={{ marginVertical: 10, flex: 1 }}
        {...textInputProps}
      />
    </View>
  );
}

export function LoadingShade({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1000,
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return null;
}

export function useTheme() {
  const theme = useColorScheme() ?? "light";
  const themeColors = Colors[theme];
  return themeColors;
}
