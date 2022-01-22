import Checklist from '../components/Checklist';

function Home(props) {
    return (
        <div className="home">
            <Checklist logged_user={props.logged_user} />
        </div>
    )
}

export default Home