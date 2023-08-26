import React from 'react'
import AboutUsPage from 'src/component/AboutUs'
import { Footer, NewNavigation } from 'src/component/core'

function index() {
    return (
        <>

            <div className="overflow-hidden">
                <NewNavigation />
                <AboutUsPage />
                <Footer />
            </div>
        </>
    )
}

export default index