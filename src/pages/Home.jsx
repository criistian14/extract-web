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
            separatorExceptions: '',
            data: []
        }
    }
    
    changeValue(event, element)
    {
        if(element != 'exceptions')
            return this.setState({ [element]: event.target.value })
    
        this.setState({ [element]: event.target.value.split(this.state.separatorExceptions) })
    }


    async extract()
    {
        let response = await axios.get(`${this.state.proxy}${this.state.url}`).then(res => res.data)

        let info = response.slice(response.indexOf(this.state.init) - this.state.spacesToInit)
    
        info = info.slice(0, info.indexOf(this.state.end) - this.state.spacesToEnd)
    
        let datos = [],
            sobrante = info
    
    
        for (let index = 0; index < sobrante.length; index++) {
    
            if(sobrante.includes(this.state.initSeparator)) {
                
                let posiIni  = sobrante.indexOf(this.state.initSeparator),
                    posiEnd  = sobrante.indexOf(this.state.endSeparator),
                    textTemp = sobrante.slice(posiIni + this.state.initSeparator.length, posiEnd)
        
                if(this.validateError(textTemp))
                    datos.push(textTemp)
    


                sobrante = sobrante.slice(posiEnd + this.state.endSeparator.length)
    
            } else {
                // datos.pop()
                index = sobrante.length
            }
        }

        this.setState({data: datos})
    }


    validateError(textTemp)
    {
        if(!textTemp)
            return false

        
        if(this.state.exceptions.length < 0)
            return true


        let flag = false; 

        this.state.exceptions.map((el) => {
            
            if(!flag) {
                flag = textTemp.includes(el)
            }
        })
        return !flag;
    }


    render()
    {
        return <Grid container spacing={16} justify="center">

            <Header />
            
            <Grid container spacing={16} className="container"> 
            
                <Grid item xs={12} >
                    <TextField label="Url" margin="normal" fullWidth onChange={(event) => this.changeValue(event, 'url') }  />
                </Grid>


                <Grid item xs={6} >
                    <TextField label="Busqueda Inicio" margin="normal" fullWidth onChange={(event) => this.changeValue(event, 'init') }  />
                </Grid>

                <Grid item xs={6} >
                    <TextField label="Busqueda Final" margin="normal" fullWidth onChange={(event) => this.changeValue(event, 'end') }  />
                </Grid>


                <Grid item xs={3} >
                    <TextField label="Separador Incial" margin="normal" fullWidth onChange={(event) => this.changeValue(event, 'initSeparator') }  />
                </Grid>

                <Grid item xs={3} >
                    <TextField label="Separador Final" margin="normal" fullWidth onChange={(event) => this.changeValue(event, 'endSeparator') }  />
                </Grid>

                <Grid item xs={3} >
                    <TextField label="Spacios Inicio" margin="normal" type="number" fullWidth onChange={(event) => this.changeValue(event, 'spacesToInit') }  />
                </Grid>

                <Grid item xs={3} >
                    <TextField label="Spacios Final" margin="normal" type="number" fullWidth onChange={(event) => this.changeValue(event, 'spacesToEnd') }  />
                </Grid>


                <Grid item xs={8} >
                    <TextField label="Excepciones" margin="normal" multiline fullWidth onChange={(event) => this.changeValue(event, 'exceptions') }  />
                </Grid>                
                
                <Grid item xs={4} >
                    <TextField label="Separador" margin="normal" fullWidth onChange={(event) => this.changeValue(event, 'separatorExceptions') }  />
                </Grid>

     
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={() => this.extract()} >
                        Consultar
                    </Button>
                </Grid>
                

                <Grid item xs={12}>
                    {
                        this.state.data.map((pararfo, i) => <p key={i}>{pararfo}</p>)
                    }
                    
                </Grid>
            </Grid>

        </Grid>
    }

}


export default Home
