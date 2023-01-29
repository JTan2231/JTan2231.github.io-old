import * as config from './config.js';

const textColor = 'black';

const linkFontSize = config.TEXT_RATIO*150+'%';

export const styles = {
    pageStyle: {
        'userSelect': 'none'
    },

    contentStyle: {
        'zIndex': 4,
        'position': 'absolute',
        'color': textColor,
        'fontFamily': 'Courier New',
        'fontSize': config.MENU_CONTENT_HEIGHT/2+'px',
        'width': 100*(1-config.TEXT_RATIO)+'%',
        'height': config.MENU_CONTENT_HEIGHT,
    },

    githubStyle: {
        'zIndex': 4,
        'position': 'absolute',
        'color': textColor,
        'fontFamily': 'Courier New',
        'fontSize': linkFontSize,
        'width': 50*(1-config.TEXT_RATIO)+'%',
        'left': 50*(1-config.TEXT_RATIO)+'%',
        'height': config.MENU_CONTENT_HEIGHT,
    },

    linkedinStyle: {
        'zIndex': 5,
        'position': 'absolute',
        'top': '18px',
        'color': textColor,
        'fontFamily': 'Courier New',
        'fontSize': linkFontSize,
        'width': 50*(1-config.TEXT_RATIO)+'%',
        'height': config.MENU_CONTENT_HEIGHT,
    },

    backgroundStyle: {
        'zIndex': 1,
        'position': 'absolute',
        'top': '0%',
    },

    circlesStyle: {
        'zIndex': 2,
        'position': 'absolute',
        'top': '0px',
    },

    leftBackgroundStyle: {
        'zIndex': 3,
        'position': 'absolute',
        'top': '0px',
        'left': '0px',
    },
};
