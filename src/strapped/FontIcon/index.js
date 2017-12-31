// @flow
import { type IconKey } from './iconKey';
export type IconFamily = 'solid' | 'brand' | 'light' | 'regular';
export type IconSize = 75 | 86 | 100 | 133 | 200 | 300 | 400 | 500 | 600 | 800 | 1000;
export const familyMapping = (iconFamily: IconFamily) => {
    switch (iconFamily) {
    case 'solid':
        return 'fas';
    case 'brand':
        return 'fab';
    case 'light':
        return 'fal';
    case 'regular':
        return 'far';
    }
};
export const fixedWidthMapping = (isFixedWidth: boolean) => isFixedWidth ?
    'fa-fw' :
    '';
export const inverseMapping = (isInverse: boolean) => isInverse ?
    'fa-inverse' :
    '';
/* eslint-disable no-magic-numbers */
export const sizeMapping = (iconSize: IconSize): string | void => {
    switch (iconSize) {
    case 75:
        return 'fa-xs';
    case 86:
        return 'fa-sm';
    case 100:
        return '';
    case 133:
        return 'fa-lg';
    case 200:
        return 'fa-2x';
    case 300:
        return 'fa-3x';
    case 400:
        return 'fa-4x';
    case 500:
        return 'fa-5x';
    case 600:
        return 'fa-6x';
    case 800:
        return 'fa-8x';
    case 1000:
        return 'fa-10x';
    default:
        return undefined;
    }
};
/* eslint-enable no-magic-numbers */

export type MaterialColor =
     'red'
    | 'pink'
    | 'purple'
    | 'deep-purple'
    | 'indigo'
    | 'blue'
    | 'light-blue'
    | 'cyan'
    | 'teal'
    | 'green'
    | 'lime'
    | 'light-green'
    | 'amber'
    | 'yellow'
    | 'orange'
    | 'deep-orange'
    | 'white'
    | 'black'
    | 'brown'
    | 'blue-grey'
    | 'grey';

export interface ColorSet {
    background?: MaterialColor,
    foreground?: MaterialColor
}

export const colorMapping = (colors: ColorSet) => {
    const styleText = [ colors.foreground && `color: ${capitalize(colors.foreground)}`, colors.background && `background: ${capitalize(colors.background)}` ];
    return styleText.length > 1;
};

export const keyMapping: (key: IconKey) => string = (key: IconKey) => `fa-${key}`;

module.exports = {
    colorMapping
    , familyMapping
    , fixedWidthMapping
    , inverseMapping
    , keyMapping
    , sizeMapping
};
