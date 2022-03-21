const deviceSizes = {
  mobile: '375px',
  tablet: '768px',
  laptop: '1024px',
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
};

const pixelToRem = (size) => `${size / 16}rem`;

const fontSizes = {
  big: pixelToRem(35),
  middle: pixelToRem(30),
  small: pixelToRem(25),
  xSmall: pixelToRem(20),
  xxSmall: pixelToRem(15),
};

const colors = {
  black: '#000',
  white: '#eee',
  grey: '#b3b3b3',
  lightGery: '#f9f9f9',
  blue: '#4348a2',
  borderBlue: '#868ceb',
  lightBlue: '#4348a2',
};

const common = {
  flexCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};

const theme = {
  fontSizes,
  colors,
  common,
  device,
};

export default theme;
