import { useCallback, useMemo, useState } from "react";

import { createLink, AddLinkParamsType } from "../../server/api";

import { statusCodesMap } from "../../utils";

import './form.scss';

export const AddForm = () => {
  const [info, setInfo] = useState<AddLinkParamsType>({
    path: '',
    password: '',
    name: '',
    url: '',
  })
  const [createdUrl, setCreatedUrl] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<number | undefined>(undefined);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }, [info]);

  const handleSubmit = useCallback(async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const response = await createLink(info);
      if (response) {
        setStatus(response.status);
        setCreatedUrl(response.data.url);
      }
    } catch (e) {
      console.warn(e.message);
    }
  }, [info]);

  const statusText = useMemo(() => {
    if (status) return (<span className={status === 201 ? 'status__success' : 'status__error'}>{statusCodesMap[status]}</span>)
    else return (<span className='status__none'>Try your custom link!</span>)
  }, [status])

  return (
    <div className='addFormWrapper'>
      <div className='formContainer'>
        <img src='https://techjobsni.co.uk/wp-content/uploads/2020/02/6421040.png' alt='network' />
        <form>
          <label htmlFor="path">Your path</label>
          <input name='path' onChange={handleChange} value={info.path} />
          <label htmlFor="password">Password</label>
          <input name='password' type='password' onChange={handleChange} value={info.password} />
          <label htmlFor="name">Name</label>
          <input name='name' onChange={handleChange} value={info.name} />
          <label htmlFor="url">URL</label>
          <input name='url' onChange={handleChange} value={info.url} />
          <div className='submitButton' onClick={handleSubmit}>Create link</div>
        </form>
      </div>
      <div className='statusContainer'>
        {statusText}
        <span className='url'><a href={createdUrl} target='_blank' rel="noreferrer">{createdUrl}</a></span>
      </div>
    </div>
  )
}