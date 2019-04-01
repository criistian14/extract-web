import React from 'react'
import ReactDom from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import './styles/app.css'


// Pages
import Home from './pages/Home'


ReactDom.render(<Router>
    <div>
        <Route path="/" component={Home} exact />
    </div>
</Router>, document.getElementById('root'))


