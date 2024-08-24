// a ViewCreator page to view a single content creator
import { useEffect, useState } from 'react';
import '../styles/ViewCreator.css';
import supabase from '../supabase/client';
import { Tables } from '../supabase/database.types';
import { Link, Outlet, useParams } from 'react-router-dom';
import { getRandomImageUrl } from '../constants/constants';
import DeleteModal from '../components/DeleteModal';


const ViewCreator = () => {
  const [creator, setCreator] = useState<Tables<'creators'>>({
    created_at: '',
    id: -1,
    name: '',
    url: '',
    description: '',
    imageURL: null,
  });
  const creatorId = useParams().creatorId;
  useEffect(() => {
    if(!creatorId) {
      return;
    }
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', creatorId);
      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        console.log('creator:', data);
        setCreator(data[0]);
      }
    };
    fetchCreator();
  }, [creatorId]);

  type CreatorContextType = [typeof creator, React.Dispatch<React.SetStateAction<typeof creator>>];

  if(!creatorId) {
    return <h2>Creator not found</h2>;
  }

  return (
    <div className="creator-page-container">
      <div className="creator-page-content">
        <h1 className="creator-page-title">{creator.name}</h1>
        <a href={creator.url} className="creator-page-url">{creator.url}</a>
        {/* <p className="creator-page-description">{creator.description}</p> */}
        <p className="creator-page-description">
          <span className="code-keyword">const</span> <span className="code-variable">description</span> = "<span className="code-string">{creator.description}</span>";
        </p>
        <img
          src={creator.imageURL ?? getRandomImageUrl()}
          alt={creator.name}
          className="creator-page-image"
          width='200px'
          height='200px'
        />
      </div>
      <div className="creator-page-button-container">
        <Link to={`/creator/${creator.id}/edit`}>
          <button className="creator-page-button">Edit</button>
        </Link>
        <DeleteModal creator={creator} />
      </div>
      <Outlet context={[creator, setCreator] satisfies CreatorContextType} />
    </div>
  )
}

export default ViewCreator;



