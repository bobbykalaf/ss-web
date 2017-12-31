// @flow
export type IconFamily = 'solid' | 'brand' | 'light' | 'regular';

const mappingToClassName = (iconFamily: IconFamily) => {
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

const defaultValue: IconFamily = 'solid';

module.exports = {
    defaultValue
    , mappingToClassName
};