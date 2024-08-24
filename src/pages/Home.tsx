import '../styles/Home.css';
import supabase from '../supabase/client';
import { useEffect, useState } from 'react';
import { Tables } from '../supabase/database.types';
import Streamer from '../components/Streamer';
import { Link } from 'react-router-dom';

/*
Phew! We're doing good so far! Next, let's allow the user to add a content creator to the 💫 Creatorverse.

Edit your home page by:

Adding a button on your main page to allow the user to add a content creator
The button should go to the page you created for adding a content creator
Edit the page you created for adding a content creator by:

Importing supabase from client.js
Adding a form for the user to enter details about the new content creator (name, url, description, and imageURL (optional))
Writing an asynchronous function to add the new content creator to the database
*/



const Home = () => {
  const [creators, setCreators] = useState<Tables<"creators">[]>([]);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*');
      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        console.log('creators:', data);
        const shuffledCreators = data.sort(() => Math.random() - 0.5);
        setCreators(shuffledCreators);
      }
    };
    fetchCreators();
  }, []);

  return (
    <div className='home-page'>
    <h1 style={{ color: 'black' }}>Welcome to CreatorVerse!</h1>
    <h2 style={{ color: 'black' }}>Connect with fellow Twitch streamers and grow your community</h2>
      <Link to='/add-creator'><button>Add Creator!</button></Link>
      {!creators || creators.length === 0 ? (
        <p>No creators yet...</p>
      ) : (
        <div className='streamer-container'>{creators.map(creator => (
          <Streamer
            key={creator.id + '-card'}
            creator={creator}
          />
        ))}</div>
      )}
    </div>
  )
}

export default Home;

