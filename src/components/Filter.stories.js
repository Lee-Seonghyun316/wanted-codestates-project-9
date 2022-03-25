import React from 'react';
import Filter from './Filter';

export default {
  component: Filter,
  title: 'Filter',
};

const Template = (args) => <Filter {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: '정렬',
  type: 'sub',
};

export const Main = Template.bind({});
Main.args = {
  ...Default.args,
  type: 'main',
};
