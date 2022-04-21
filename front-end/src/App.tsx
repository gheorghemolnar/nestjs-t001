import React, { FormEvent, useState } from 'react';
import logo from './logo.svg';
import {
  useAddMessageMutation,
  useGetMessagesQuery,
} from './graphql/message.generated';
import {
  useGetUrlsQuery,
  useAddUrlMutation,
} from './graphql/url.generated';

function App() {
  const [newMessage, setNewMessage] = useState({ value: '' });
  const { data, refetch } = useGetMessagesQuery();
  const [addMessage] = useAddMessageMutation();

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage({ value: e.target.value });
  };
  const onSubmitMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.value) {
      await addMessage({ variables: { message: newMessage.value } });
      setNewMessage({ value: '' });
      await refetch();
    }
  };

  const [newUrl, setNewUrl] = useState({ value: '' });
  const { data: dataUrls, refetch: refetchUrls } = useGetUrlsQuery();
  const [addUrl] = useAddUrlMutation();

  const onChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUrl({ value: e.target.value });
  };
  const onSubmitUrl = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newUrl.value) {
      await addUrl({ variables: { url: newUrl.value } });
      setNewUrl({ value: '' });
      await refetchUrls();
    }
  };

  return (
    <div className="bg-main-blue min-h-screen">
      <header className="container mx-auto py-14 flex justify-between">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-white font-bold text-2xl">
          URL shortener
        </h1>
      </header>
      <section className="container mx-auto py-8">
        <div
          data-cy="messageContainer"
          className="p-8 flex flex-col gap-6 items-center bg-white rounded-2xl"
        >
          <div
            className="font-semibold text-xl"
          >
            Add a few messages to ensure that everything is working correctly :
          </div>
          {data?.messages.map((message) => (
            <div key={message.id}>{message.message}</div>
          ))}
          <div className="font-semibold">
            <form
              className="flex gap-4"
              onSubmit={onSubmitMessage}
            >
              <input
                data-cy="messageInput"
                placeholder="Your message"
                className="p-3 w-96 border-2 rounded-full border-main-blue"
                value={newMessage.value}
                onChange={onChangeMessage}
              />
              <button
                data-cy="submit"
                type="submit"
                className="p-3 bg-main-blue text-white rounded-full"
              >
                Add message
              </button>
            </form>
          </div>
        </div>
        <div
          data-cy="urleContainer"
          className="p-8 flex flex-col gap-6 items-center bg-white rounded-2xl"
        >
          <div
            className="font-semibold text-xl"
          >
            Add a few urls to ensure that everything is working correctly :
          </div>
          {dataUrls?.urls.map((url) => (
            <div key={url.id}>{`${url.url_orig} ----- ${url.url_new}`}</div>
          ))}
          <div className="font-semibold">
            <form
              className="flex gap-4"
              onSubmit={onSubmitUrl}
            >
              <input
                data-cy="urlInput"
                placeholder="Your url"
                className="p-3 w-96 border-2 rounded-full border-main-blue"
                value={newUrl.value}
                onChange={onChangeUrl}
              />
              <button
                data-cy="submit"
                type="submit"
                className="p-3 bg-main-blue text-white rounded-full"
              >
                Add url
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
