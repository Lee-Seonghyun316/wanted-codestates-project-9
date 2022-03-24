const deviceSizes = {
  mobile: '375px',
  tablet: '768px',
  laptop: '1024px',
};

const device = {
  mobile: `all and (min-width:330px) and (max-width:${deviceSizes.mobile})`,
  tablet: `all and (min-width:${deviceSizes.mobile}) and (max-width:${deviceSizes.tablet})`,
  laptop: `all and (min-width:${deviceSizes.tablet})`,
};

const pixelToRem = (size) => `${size / 16}rem`;

const fontSize = {
  big: pixelToRem(35),
  middle: pixelToRem(30),
  small: pixelToRem(25),
  xSmall: pixelToRem(20),
  xxSmall: pixelToRem(15),
};

const color = {
  black: '#000',
  white: '#eee',
  grey: '#b3b3b3',
  darkGrey: '#555',
  lightGrey: '#f9f9f9',
  blue: '#4348a2',
  borderBlue: '#868ceb',
  lightBlue: '#e7e8f9',
};

const common = {
  flexColumn: `
    display: flex;
    flex-direction: column;
  `,
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
  hideScrollBar: `
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  `,
};

const usefulUnit = {
  basic: '1.2rem',
};

const theme = {
  fontSize,
  color,
  common,
  device,
  usefulUnit,
};

export default theme;
