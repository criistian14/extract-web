import React, { Component } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import '../../pac'


const styles = theme => ({
   button: {
      margin: theme.spacing.unit
   }
})

class Header extends Component {
   


   closeApp()
   {
      window.close()
   }


    render()
    {
        return <AppBar position="static">
            <Toolbar>
               <IconButton color="inherit" aria-label="Close" className={styles.button} onClick={this.closeApp}>
                  <Close />
               </IconButton>
               <Typography variant="h5" color="inherit" >
                  
               </Typography>
            </Toolbar>
        </AppBar>
    }

}


export default Header
