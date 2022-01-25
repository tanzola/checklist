import Checklists from '../components/Checklists';

function Home(props) {
    return (
        <div className="home">
            {props.user ? <Checklists user={props.user} /> : null}
        </div>
    )
}

export default Home