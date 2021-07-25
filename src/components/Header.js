import PropTypes from 'prop-types'
import Button from "./Button";

const Header = ({ title }) => {
    const onClick = () => {
        console.log('click')
    }

    return (
        <header className="header">
            <h1>{title}</h1>
            <Button color={'green'} text={'Add'} onClick={onClick} /> {/* Button-component mit Übergabeparametern*/}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.probTypes = {
    title: PropTypes.string.isRequired,
}

export default Header