import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div>
            <h4>Version 1.2.3</h4>
            <Link to='/'>Go Back</Link> {/*<Link> doesn't reload the page while <a> does*/}
        </div>
    )
}

export default About