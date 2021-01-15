import React from 'react'

import { Link } from '../../../server/api'

import './list-table.scss';

type Props = Link;

export function ListItem(props: Props) {
  const { name, url } = props;

  return (
    <div className='listItem'>
      <div>{name}</div>
      <div className='url'><a href={url} target='_blank' rel="noreferrer">{url}</a></div>
    </div>
  );
}
