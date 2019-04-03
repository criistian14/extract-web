const { app, BrowserWindow } = require('electron'),
   url = require('url'),
   path = require('path')



let win;

function createWindow() {
   
   win = new BrowserWindow({
      width: 800,
      minWidth: 800,
      height: 600,
      minHeight: 600,
      title: 'Home',
      center: true,
      frame: false
   })

   
   // Production
   /*
   win.loadURL(url.format({
      pathname: path.join(__dirname, 'build', 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
   */

   win.webContents.openDevTools()
   win.loadURL('http://localhost:8080')


   /** Dev
    * First -> npm run dev
    * 
    * 
    * win.webContents.openDevTools()
    * 
    * if (TARGET == 'electron:dev')
    * win.loadURL('http://localhost:8080')
    **/
   

}



app.on('ready', createWindow)

app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit()
   }
})