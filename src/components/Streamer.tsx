/*
In the components directory, create a file to represent a content creator. 
This component should contain the content creator's information 
(name, url, description, and imageURL (optional)) so it can be displayed on the main page. 
For example, you might want to create a Card file to organize a content creator's information on a card.
*/
import { FC } from 'react';
import '../styles/Streamer.css';
import { Link } from 'react-router-dom';
import { Tables } from '../supabase/database.types';
import { getRandomImageUrl } from '../constants/constants';
import { FaInfoCircle, FaEdit, FaTwitch } from "react-icons/fa";

type StreamerProps = {
  creator: Tables<"creators">;
}

const Streamer:FC<StreamerProps> = ({ creator }) => {
  return (
    <article className="streamer">
      <header><h2 className='streamer-name'>{creator.name}</h2></header>
        {/* <p>{creator.description}</p> */}
        <img width='100px' height='100px' src={creator.imageURL ?? getRandomImageUrl()} alt={creator.name + '-image-card'} />
        <div className='streamer-buttons'>
          {/* <Link to={`/creator/${creator.id}`}><button>View</button></Link>
          <Link to={`/creator/${creator.id}/edit`}><button>Edit</button></Link>
          <a href={creator.url}><button>twitch</button></a> */}
          <Link to={`/creator/${creator.id}`}><FaInfoCircle size='3rem' color='black' className='icon'/></Link>
          <Link to={`/creator/${creator.id}/edit`}><FaEdit size='3rem' color='black'className='icon'/></Link>
          <a href={creator.url}><FaTwitch size='3rem' color='black' className='icon'/></a>
        </div>
    </article>
  )
}

export default Streamer