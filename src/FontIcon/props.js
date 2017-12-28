// @flow
import { type ColorSet, type IconKey, type IconFamily, type IconSize, type MaterialColor } from './index';

interface IFontIconProps {
	key: IconKey;
	family: IconFamily;
	size: IconSize;
    isFixedWidth: boolean;
    isInverted: boolean;
	colorBackFore: ColorSet;
}

export function FontIconPropsConstructor(
	key: IconKey,
	family: IconFamily = 'solid',
	size: IconSize = 100,
	isFixedWidth: boolean = false,
	foreground?: MaterialColor,
	background?: MaterialColor
): IFontIconOpts {
	return { key, family, size, isFixedWidth, colorSet: { background, foreground } };
}

export default IFontIconProps;