import React, { useMemo } from 'react';

import { LinkWithID } from '../../../server/api';

import { ListItem } from './list-item';

import './list-table.scss';

type Props = {
  links?: LinkWithID[];
}


export const ListTable = (props: Props) => {
  const { links } = props;

  const list = useMemo(() => {
    if (!links) return null;
    return links.map(link => <ListItem key={link._id} name={link.name} url={link.url} />)
  }, [links])

  return (
    <div className='listTableWrapper'>
      {links && list}
    </div>
  )
}
