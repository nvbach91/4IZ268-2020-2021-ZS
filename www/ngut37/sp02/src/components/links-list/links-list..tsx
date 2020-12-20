import React, { useCallback, useMemo, useState } from "react";

import { fetchLinks, Credentials, LinkWithID } from "../../server/api";

import { ListTable } from "./links-table/list-table";

import './links-list.scss';
import { statusCodesMap } from "../../utils";


export const LinksList = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    path: '',
    password: '',
  })
  const [links, setLinks] = useState<LinkWithID[]>([])
  const [status, setStatus] = useState<number | undefined>(undefined);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }, [credentials]);

  const handleSubmit = useCallback(async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const response = await fetchLinks(credentials)
      if (response) {
        setStatus(response.status);
        setLinks(response?.data.links);
      }
    } catch (e) {
      console.warn(e.message);
    }
  }, [credentials]);

  const statusText = useMemo(() => {
    if (status) return (<span className={status === 200 ? 'status__success' : 'status__error'}>{statusCodesMap[status]}</span>)
  }, [status])

  return (
    <div className='linksListWrapper'>
      <form>
        <label htmlFor="path">Your path</label>
        <input name='path' onChange={handleChange} value={credentials.path} />
        <label htmlFor="password">Password</label>
        <input name='password' type='password' onChange={handleChange} value={credentials.password} />
        <div className='submitButton' onClick={handleSubmit}>List your links</div>
      </form>
      {statusText}
      <ListTable links={links} />
    </div>
  )
}