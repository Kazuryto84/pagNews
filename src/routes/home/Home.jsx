import { Outlet } from 'react-router-dom'; 
import StoriesComponent from '../../components/stories/stories.component';
import Footer from '../../components/footer/footer.component';

const Home = ({status}) => {
  return (
    <div id="contents">
       <StoriesComponent status={status} />
       <Outlet />
       <Footer />
    </div>
   
  )
};

export default Home;