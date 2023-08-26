import React from 'react';
import { List } from 'antd';
import { ListItemMetaProps } from 'antd/lib/list';
import { ListItemTypeProps } from 'antd/lib/list/Item';

export const ListItem: ListItemTypeProps = List.Item;

export interface ListProps extends ListItemMetaProps {
  title?: string
  description?: string
  className?: string
}

export const WSList: React.FC<ListProps> = (
  { title, description, className, children, ...props }
) => {
  return <List.Item className={className} {...props} >
    <List.Item.Meta title={title} description={description} {...props}>
      {children}
    </List.Item.Meta>
  </List.Item>;
};
