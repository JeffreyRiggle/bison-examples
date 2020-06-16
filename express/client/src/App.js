import React from 'react';
import { Post } from './Post';
import bison from '@jeffriggle/bison/dist/esm/index';
import './App.css';

function App() {
  const [drafting, setDrafing] = React.useState(false);
  const [draftTitle, setDraftTitle] = React.useState('');
  const [draftBody, setDraftBody] = React.useState('');
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const req = new Request('http://localhost:3000/posts', {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/bison',
        'Accept': 'application/bison'
      }
    });

    fetch(req).then(res => {
      res.arrayBuffer().then(buff => {
        const result = bison.decode(Buffer(buff)) || {}

        const posts = []
        Object.keys(result).forEach(key => {
          posts.push(result[key]);
        });

        setPosts(posts);
      });
    });
  }, [drafting]);

  function sendPost(post) {
    const req = new Request('http://localhost:3000/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/bison',
        'Accept': 'application/bison'
      },
      body: bison.encode(post)
    });

    fetch(req).finally(() => {
      setDrafing(false);
      setDraftBody('');
      setDraftTitle('');
    })
  }

  return (
    <div className="App">
      { 
        posts.map(post => {
          return <Post key={post.id} {...post} />
        })
      }

      { !drafting && (
        <button onClick={() => {
          setDrafing(true);
        }}>Create Post</button>
      )}
  
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
