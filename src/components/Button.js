import PropTypes from 'prop-types'

const Button = ({color, text, onClick}) => { // übergabeparameter
    return (
        <button className='btn' style={{backgroundColor: color}} onClick={onClick}>
            {text}
        </button>
    )
}

Button.defaultProbs = {
    color: 'steelblue'
}

Button.propTypes = { // Übergabeparameter-Typen werden bestimmt
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button