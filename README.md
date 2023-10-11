# Transparent-Google-Slides
A javaScript app to play Google Slides with a transparent background and connect to OBS to control scene changes. 

This is an Electron Fiddle app that removes the background from a Published Google Slide show.  
## New features
**Control slides by raising a hand**
Raise your right hand to go to the next slide. Raise your left hand to go to the previous slide. 
The [MediaPipe](https://developers.google.com/mediapipe) machine learning javascript library tracks the presenters pose. 

 **Teleprompter slide notes**. Your slide notes scroll, like a teleprompter.  
![image](https://github.com/UUoocl/Transparent-Google-Slides/assets/99063397/49959c88-9bd9-4865-8de3-d101856ee812)

Adjust the text size and scroll speed. 
|Action      |Key      |
|:-----|:-----|
|⏪Slowdown/reverse scrolling      |F8|
|⏸️Pause scrolling      |F9     |
|⏩Speed up scrolling      |F10      |
|➕Increase notes text size      | =   |
|➖Decrease notes text size      |-     |

**Send and Receive WebSocket messages from the OBS Plug-in Advanced Scene Switcher**.
Messages to Advanced scene switcher can be encoded in the slide notes.  Double pipe characters are used to indicate the start and end of a message.  For example, ||Turn on Luma Filter||, will send the message "Turn on Luma Filter".  Advanced Scene Switcher macro

![image](https://github.com/UUoocl/Transparent-Google-Slides/assets/99063397/a2fbc51c-286d-4f37-8bc7-582d8fd9e67e)

Transparent Google Slides can recieve the following from messages: Next, Previous, Notes Zoom In, Notes Zoom Out, Notes Scroll Faster, Notes-Scroll-Slower

It also uses OBS WebSockets to change scenes in OBS based on the slide notes.  

**Camera background**
Use a camera as a video background to the transparent slides.  Combine this feature with Zoom screen sharing to make a creative presentations. 

## Using this app

### Opening the app
1. Download the [release for your Operating System](https://github.com/UUoocl/Transparent-Google-Slides/releases).
2. Extract the .ZIP file to a location of your choice.
3. Run the app executable file (.exe or .app for windows or MacOS respectively) 
#### Windows security warning
  Windows may prevent this app from running because it is "unrecoginzed".  Click the "More Info" link, then click "run anyway".
  ![image](https://github.com/UUoocl/Transparent-Google-Slides/assets/99063397/f3eaf79a-fbd6-413d-b2ee-760fdd2a548f)

#### MacOS security warning
  Because this app is not "signed", MacOS may prevent the app from running. An error will appear that says the app is "damaged".    
![image](https://github.com/UUoocl/Transparent-Google-Slides/assets/99063397/1bb66bcb-c689-4da8-bb2e-d3c1b9ee2b20)

To run an app that is not signed, follow these steps. 
In the Finder, navigate to the folder containing the Transparent-Google-Slides app. 
Press "**Control" + click** on the folder, then click "New Terminal at Folder".  
In the Terminal type "**xattr -cr transparent-google-slides-0-0-3.app**" to remove the security warnings for this app. Now the app should run.  

For example, if the Transparent-Google-Slides app is in the "Downloads" folder the terminal should look like "**userName@dhcp-##-##-####-### Downloads % xattr -cr transparent-google-slides-0-0-3.app**"

### Set the Slides background color

In Google Slides set the background color to #ABCDEF.  The script looks for the color code #ABCDEF when removing the background. 

### Add notes

Double brackets "{{ }}" are used to indicate which Scene to switch too. For Example, add the note {{Scene 1}} to switch to an OBS scene named "Scene 1". 

Other text can be in the notes section. The brackets can appear any where in the notes. 

### Publish the Slides

To Publish your slides, click 'file --> Share --> Publish to web'

### Turn on WebSocket Server in OBS

### [Download this app](https://github.com/UUoocl/Transparent-Google-Slides/releases/tag/0.0.1-alpha)



