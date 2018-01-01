// @flow
import * as SS from 'ss-common';

SS.

type MaterialColor =
    | 'red'
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
Te
export const colorMapping = (colors: ColorSet) => {
    const styleText = [ colors.foreground && `color: ${capitalize(colors.foreground)}`, colors.background && `background: ${capitalize(colors.background)}` ];
    return styleText.length > 1;
};
