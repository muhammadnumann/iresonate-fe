import React from 'react';
import { Tabs, TabsProps } from 'antd';

import { TabArrayProps } from 'src/constants/interfaces';

const { TabPane } = Tabs;
interface WSTabsProps extends TabsProps{
  tabArray: TabArrayProps[];
}

const WSTabs = (props: WSTabsProps) => {
  const { tabArray } = props;
  return (
    <Tabs {...props} defaultActiveKey={tabArray[0].name} centered>
      {tabArray.map((item) => (
        <TabPane tab={item.name} key={item.name}>
          {item.component}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default WSTabs;
