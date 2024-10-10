import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateStoryAsync } from '../../store/story/story.actions';
import { selectStory } from '../../store/story/story.selector';
import SendForm from '../../components/send-form/send-form.component';

const Send = () => {
  const { id } = useParams(); 
  const story = useSelector(selectStory(id));

  return <SendForm formValues={story} sendAction={updateStoryAsync}/>
};

export default Send;