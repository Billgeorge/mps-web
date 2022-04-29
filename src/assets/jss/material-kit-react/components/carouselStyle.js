import { container } from "assets/jss/material-kit-react.js";

const carouselStyle = {
    container: {
        width: '98%',
        ...container
    },
    minImg: {
        maxWidth: '100%',
        maxHeight: '100%'
    },
    mainImg: {
        maxWidth: '100%',
        maxHeight: '500px'
    },
    gridZeroPadding: {
        padding: '0'
    },
    containerImg: {
        zIndex: '5',
        border: '1px solid rgba(0,0,0,.25)',
        cursor: 'pointer',
        borderRadius: '6px',
        padding: '2px'
    },
    containerEnableImg: {
        zIndex: '5',
        border: '2px solid #3483fa',
        cursor: 'pointer',
        borderRadius: '6px',
        padding: '2px'
    },
    '@media(max-width: 450px)': {
        gridZeroPadding: {
            display: 'flex'
            // display:'none'        
        },
        minImg: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            overflow: 'hidden'
        },
        containerImg: {
            maxWidth: '48px',
            width: 'auto',
            maxHeight: '48px'
        },
        containerEnableImg: {
            maxWidth: '48px',
            width: 'auto',
            maxHeight: '48px'
        }
    }

}

export default carouselStyle;