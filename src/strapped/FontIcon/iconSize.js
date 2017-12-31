// @flow
export type IconSize = 75 | 86 | 100 | 133 | 200 | 300 | 400 | 500 | 600 | 800 | 1000;

/* eslint-disable no-magic-numbers */
const mappingToClassName = (iconSize: IconSize): string | void => {
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

const defaultValue: IconSize = 100;
module.exports = {
    defaultValue
    , mappingToClassName
};