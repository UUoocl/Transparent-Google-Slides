# Transparent-Google-Slides
A javaScript app to play Google Slides with a transparent background and connect to OBS to control scene changes. 

This is an Electron Fiddle app that removes the background from a Published Google Slide show.  It also uses OBS WebSockets to change scenes in OBS based on the slide notes.  

## Using this app

### Set the Slides background color

In Google Slides set the background color to #ABCDEF.  The script looks for the color code #ABCDEF when removing the background. 

### Add notes

Double brackets "{{ }}" are used to indicate which Scene to switch too. For Example, add the note {{Scene 1}} to switch to an OBS scene named "Scene 1". 

Other text can be in the notes section. The brackets can appear any where in the notes. 

### Publish the Slides

To Publish your slides, click 'file --> Share --> Publish to web'

### Turn on WebSocket Server in OBS

### Download this app



