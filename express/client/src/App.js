import React from 'react';
import { Post } from './Post';
import { encode } from '@jeffriggle/bison/dist/esm/index';
import './App.css';

function App() {
  const [drafting, setDrafing] = React.useState(false);
  const [draftTitle, setDraftTitle] = React.useState('');
  const [draftBody, setDraftBody] = React.useState('');
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const req = new Request('http://localhost:4040/posts', {
      method: 'GET'
    });

    fetch(req).then(res => {
      setPosts(res);
    });
  }, []);

  function sendPost(post) {
    const req = new Request('http://localhost:4040/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/bison'
      },
      body: encode(post)
    });

    fetch(req).finally(() => {
      setDrafing(false);
    })
  }

  return (
    <div className="App">
      { !drafting && (
        <button onClick={() => {
          setDrafing(true);
        }}>Create Post</button>
      )}

      { 
        posts.map(post => {
          return <Post {...post} />
        })
      }

      { drafting && (
        <>
          <div>
            <input type="text" value={draftTitle} onChange={(event) => {
              setDraftTitle(event.target.value);
            }}/>
            <textarea value={draftBody} onChange={(event) => {
              setDraftBody(event.target.value);
            }}/>
          </div>
          <div>
            <button onClick={() => { setDrafing(false)}}>Cancel</button>
            <button onClick={() => { sendPost({ title: draftTitle, body: draftBody})}}>Post</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
