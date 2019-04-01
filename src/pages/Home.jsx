import React, { Component } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import Header from '../components/Header'
import axios from 'axios'



class Home extends Component {
    
    constructor(props)
    {
        super(props)

        this.state = {
            proxy: 'https://cors-anywhere.herokuapp.com/',
            url: '',
            init: '',
            end: '',
            initSeparator: '',
            endSeparator: '',
            spacesToInit: 0,
            spacesToEnd: 0,
            exceptions: [],
            data: []
        }
    }
    
    changeUrl(event)
    {
        this.setState({url: event.target.value})
    }


    async extract()
    {
        let response = await axios.get(`${this.state.proxy}${this.state.url}`).then(res => res.data)

        let info = response.slice(response.indexOf(this.state.init) - this.state.spacesToInit)
    
        info = info.slice(0, info.indexOf(ths.state.end) - spacesToEnd)
    
        let datos = [],
            sobrante = info
    
    
        for (let index = 0; index < sobrante.length; index++) {
    
            if(sobrante.includes(this.state.initSeparator)) {
                
                let posiIni  = sobrante.indexOf(this.state.initSeparator),
                    posiEnd  = sobrante.indexOf(this.state.endSeparator),
                    textTemp = sobrante.slice(posiIni + this.state.initSeparator.length, posiEnd)
        
                
                console.log(this.state.exceptions.find((el) => textTemp.includes(el)))
    
                if (!!textTemp 
                    && !textTemp.includes('</center>') 
                    && !textTemp.includes('&nbsp')
                    && !textTemp.includes('<img'))
                    datos.push(textTemp)
        
                sobrante = sobrante.slice(posiEnd + 3)
    
            } else {
                datos.pop()
                index = sobrante.length
            }
        }

        this.setState({data: datos})
    }


    render()
    {
        return <Grid container spacing={16} justify="center">

<Header />
            <Grid container justify="center">
                <TextField label="Url" margin="normal"  onChange={(event) => this.changeUrl(event) }  />
            </Grid>

            

            <Grid item xs={2}>
                <Button variant="contained" color="primary" onClick={() => this.extract()} >
                    Enviar
                </Button>
            </Grid>

            <Grid item xs={8}>
                {
                    this.state.data.map((pararfo) => <p>{pararfo}</p>)
                }
                
            </Grid>
        </Grid>
    }

}


export default Home
