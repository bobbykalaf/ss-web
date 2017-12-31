// @flow
import { type ColorSet, type IconFamily, type IconKey, type IconSize, type MaterialColor } from './index';

interface IFontIconProps {
    colorBackFore: ColorSet;
    family: IconFamily;
    key: IconKey;
    size: IconSize;
    isFixedWidth: boolean;
    isInverted: boolean;
}

export function FontIconPropsConstructor(background?: MaterialColor,
    family: IconFamily = 'solid',
    foreground?: MaterialColor,
    isFixedWidth: boolean = false,
    key: IconKey,
    size: IconSize = 100 // eslint-disable-line no-magic-numbers
): IFontIconOpts {
    return {
        colorSet: { background, foreground }
        , family
        , isFixedWidth
        , key
        , size
    };
}

export default IFontIconProps;