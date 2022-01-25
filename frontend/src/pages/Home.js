import Checklist from '../components/Checklist';

function Home(props) {
    return (
        <div className="home">
            {props.user ? <Checklist user={props.user} /> : null}
        </div>
    )
}

export default Home