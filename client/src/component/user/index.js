import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Box } from '@mui/material'

const User = (props) => {
    const { content } = props
    return (
        <>
            <Header />
            <Box>
                {content}
            </Box>
            <Footer />
        </>
    )
}

export default User